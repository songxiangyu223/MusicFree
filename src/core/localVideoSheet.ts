import {
    internalSerializeKey,
    StorageKeys,
    supportLocalMediaType,
} from '@/constants/commonConst';
import mp3Util, {IBasicMeta} from '@/native/mp3Util';
import {
    getInternalData,
    InternalDataType,
    isSameMediaItem,
} from '@/utils/mediaItem';
import StateMapper from '@/utils/stateMapper';
import {getStorage, setStorage} from '@/utils/storage';
import {nanoid} from 'nanoid';
import {useEffect, useState} from 'react';
import {exists, readDir, ReadDirItem, unlink} from 'react-native-fs';
import {addFileScheme, getFileName} from '@/utils/fileUtils';
import CryptoJs from 'crypto-js';
import MediaRouter, { MediaType } from './mediaRouter';

// 支持的视频文件扩展名
const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.m4v'];

let localVideoSheet: IVideo.IVideoItem[] = [];
const localVideoSheetStateMapper = new StateMapper(() => localVideoSheet);

export async function setupVideos() {
    const sheet = await getStorage(StorageKeys.LocalVideoSheet);
    if (sheet) {
        let validSheet: IVideo.IVideoItem[] = [];
        for (let videoItem of sheet) {
            const localPath = getInternalData<string>(
                videoItem,
                InternalDataType.LOCALPATH,
            );
            if (localPath && (await exists(localPath))) {
                validSheet.push(videoItem);
            }
        }
        if (validSheet.length !== sheet.length) {
            await setStorage(StorageKeys.LocalVideoSheet, validSheet);
        }
        localVideoSheet = validSheet;
    } else {
        await setStorage(StorageKeys.LocalVideoSheet, []);
    }
    localVideoSheetStateMapper.notify();
}

export async function addVideo(
    videoItem: IVideo.IVideoItem | IVideo.IVideoItem[],
) {
    if (!Array.isArray(videoItem)) {
        videoItem = [videoItem];
    }
    let newSheet = [...localVideoSheet];
    videoItem.forEach(vi => {
        if (localVideoSheet.findIndex(_ => isSameMediaItem(vi, _)) === -1) {
            newSheet.push(vi);
        }
    });
    await setStorage(StorageKeys.LocalVideoSheet, newSheet);
    localVideoSheet = newSheet;
    localVideoSheetStateMapper.notify();
}

function addVideoDraft(videoItem: IVideo.IVideoItem | IVideo.IVideoItem[]) {
    if (!Array.isArray(videoItem)) {
        videoItem = [videoItem];
    }
    let newSheet = [...localVideoSheet];
    videoItem.forEach(vi => {
        if (localVideoSheet.findIndex(_ => isSameMediaItem(vi, _)) === -1) {
            newSheet.push(vi);
        }
    });
    localVideoSheet = newSheet;
    localVideoSheetStateMapper.notify();
}

async function saveLocalVideoSheet() {
    await setStorage(StorageKeys.LocalVideoSheet, localVideoSheet);
}

export async function removeVideo(
    videoItem: IVideo.IVideoItem,
    deleteOriginalFile = false,
) {
    const idx = localVideoSheet.findIndex(_ => isSameMediaItem(_, videoItem));
    let newSheet = [...localVideoSheet];
    if (idx !== -1) {
        const localVideoItem = localVideoSheet[idx];
        newSheet.splice(idx, 1);
        const localPath =
            videoItem[internalSerializeKey]?.localPath ??
            localVideoItem[internalSerializeKey]?.localPath;
        if (deleteOriginalFile && localPath) {
            try {
                await unlink(localPath);
            } catch (e: any) {
                if (e.message !== 'File does not exist') {
                    throw e;
                }
            }
        }
    }
    localVideoSheet = newSheet;
    localVideoSheetStateMapper.notify();
    saveLocalVideoSheet();
}

function parseVideoFilename(fn: string): Partial<IVideo.IVideoItem> | null {
    const data = fn.slice(0, fn.lastIndexOf('.')).split('@');
    const [platform, id, title] = data;
    if (!platform || !id) {
        return null;
    }
    return {
        id,
        platform: platform,
        title: title ?? '',
    };
}

function localVideoFilter(filename: string) {
    return VIDEO_EXTENSIONS.some(ext => filename.toLowerCase().endsWith(ext.toLowerCase()));
}

// 扩展现有的媒体过滤器以支持视频
function localMediaFilter(filename: string) {
    return supportLocalMediaType.some(ext => filename.endsWith(ext)) || 
           localVideoFilter(filename);
}

let importToken: string | null = null;

// 获取本地媒体文件列表（音频和视频）
async function getMediaStats(folderPaths: string[]) {
    const _importToken = nanoid();
    importToken = _importToken;
    const musicList: string[] = [];
    const videoList: string[] = [];
    let peek: string | undefined;
    let dirFiles: ReadDirItem[] = [];
    
    while (folderPaths.length !== 0) {
        if (importToken !== _importToken) {
            throw new Error('Import Broken');
        }
        peek = folderPaths.shift() as string;
        try {
            dirFiles = await readDir(peek);
        } catch {
            dirFiles = [];
        }

        dirFiles.forEach(item => {
            if (item.isDirectory() && !folderPaths.includes(item.path)) {
                folderPaths.push(item.path);
            } else if (localMediaFilter(item.path)) {
                const mediaType = MediaRouter.detectMediaType(item.path);
                if (mediaType === MediaType.VIDEO) {
                    videoList.push(item.path);
                } else {
                    musicList.push(item.path);
                }
            }
        });
    }

    return {musicList, videoList, token: _importToken};
}

function cancelImportLocal() {
    importToken = null;
}

// 导入本地视频
const groupNum = 25;
async function importLocalVideos(_folderPaths: string[]) {
    const folderPaths = [..._folderPaths.map(it => addFileScheme(it))];
    const {videoList, token} = await getMediaStats(folderPaths);
    if (token !== importToken) {
        throw new Error('Import Broken');
    }

    // TODO: 这里可以添加视频元数据提取逻辑
    // 目前使用基本的文件信息
    const videoItems: IVideo.IVideoItem[] = await Promise.all(
        videoList.map(async (videoPath, index) => {
            let {platform, id, title} =
                parseVideoFilename(getFileName(videoPath, true)) ?? {};
            
            if (!platform || !id) {
                platform = '本地';
                id = CryptoJs.MD5(videoPath).toString(CryptoJs.enc.Hex);
            }

            // 基本视频信息
            const videoItem: IVideo.IVideoItem = {
                id,
                platform,
                title: title ?? getFileName(videoPath),
                duration: 0, // TODO: 从视频元数据获取
                artwork: '',
                filePath: videoPath,
                mimeType: getMimeType(videoPath),
                dateAdded: Date.now(),
                [internalSerializeKey]: {
                    localPath: videoPath,
                },
            };

            return videoItem;
        }),
    );
    
    if (token !== importToken) {
        throw new Error('Import Broken');
    }
    addVideo(videoItems);
}

// 扩展现有的导入功能以同时导入音频和视频
async function importLocalMedia(_folderPaths: string[]) {
    const folderPaths = [..._folderPaths.map(it => addFileScheme(it))];
    const {musicList, videoList, token} = await getMediaStats(folderPaths);
    if (token !== importToken) {
        throw new Error('Import Broken');
    }

    // 导入音频文件
    if (musicList.length > 0) {
        let metas: IBasicMeta[] = [];
        const groups = Math.ceil(musicList.length / groupNum);
        for (let i = 0; i < groups; ++i) {
            metas = metas.concat(
                await mp3Util.getMediaMeta(
                    musicList.slice(i * groupNum, (i + 1) * groupNum),
                ),
            );
        }
        
        if (token !== importToken) {
            throw new Error('Import Broken');
        }

        // 这里需要导入到原有的音乐列表
        // TODO: 需要与 LocalMusicSheet 集成
    }

    // 导入视频文件
    if (videoList.length > 0) {
        await importLocalVideos([]);
    }
}

function getMimeType(filePath: string): string {
    const ext = filePath.toLowerCase().split('.').pop();
    const mimeTypes: Record<string, string> = {
        'mp4': 'video/mp4',
        'mkv': 'video/x-matroska',
        'avi': 'video/x-msvideo',
        'mov': 'video/quicktime',
        'wmv': 'video/x-ms-wmv',
        'flv': 'video/x-flv',
        'webm': 'video/webm',
        'm4v': 'video/x-m4v',
    };
    return mimeTypes[ext || ''] || 'video/mp4';
}

/** 是否为本地视频 */
function isLocalVideo(
    videoItem: ICommon.IMediaBase | null,
): IVideo.IVideoItem | undefined {
    return videoItem
        ? localVideoSheet.find(_ => isSameMediaItem(_, videoItem))
        : undefined;
}

/** 状态-是否为本地视频 */
function useIsLocalVideo(videoItem: IVideo.IVideoItem | null) {
    const localVideoState = localVideoSheetStateMapper.useMappedState();
    const [isLocal, setIsLocal] = useState<boolean>(!!isLocalVideo(videoItem));
    useEffect(() => {
        if (!videoItem) {
            setIsLocal(false);
        } else {
            setIsLocal(!!isLocalVideo(videoItem));
        }
    }, [localVideoState, videoItem]);
    return isLocal;
}

function getVideoList() {
    return localVideoSheet;
}

async function updateVideoList(newSheet: IVideo.IVideoItem[]) {
    const _localVideoSheet = [...newSheet];
    try {
        await setStorage(StorageKeys.LocalVideoSheet, _localVideoSheet);
        localVideoSheet = _localVideoSheet;
        localVideoSheetStateMapper.notify();
    } catch {}
}

const LocalVideoSheet = {
    setup: setupVideos,
    addVideo,
    removeVideo,
    addVideoDraft,
    saveLocalVideoSheet,
    importLocalVideos,
    importLocalMedia,
    cancelImportLocal,
    isLocalVideo,
    useIsLocalVideo,
    getVideoList,
    useVideoList: localVideoSheetStateMapper.useMappedState,
    updateVideoList,
};

export default LocalVideoSheet;