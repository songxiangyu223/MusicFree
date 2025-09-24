import getUrlExt from "@/utils/getUrlExt";

/** 媒体类型枚举 */
export enum MediaType {
    AUDIO = 'audio',
    VIDEO = 'video'
}

/** 支持的音频文件扩展名 */
const AUDIO_EXTENSIONS = ['.mp3', '.flac', '.wav', '.m4a', '.aac', '.ogg', '.wma'];

/** 支持的视频文件扩展名 */
const VIDEO_EXTENSIONS = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.m4v'];

/** 媒体类型路由器 */
class MediaRouter {
    /**
     * 根据文件路径或URL检测媒体类型
     * @param urlOrPath 文件路径或URL
     * @returns 媒体类型
     */
    static detectMediaType(urlOrPath: string): MediaType {
        const ext = getUrlExt(urlOrPath).toLowerCase();
        
        if (AUDIO_EXTENSIONS.includes(ext)) {
            return MediaType.AUDIO;
        }
        
        if (VIDEO_EXTENSIONS.includes(ext)) {
            return MediaType.VIDEO;
        }
        
        // 默认返回音频类型以保持向后兼容
        return MediaType.AUDIO;
    }

    /**
     * 根据媒体项检测类型
     * @param mediaItem 媒体项
     * @returns 媒体类型
     */
    static detectMediaItemType(mediaItem: IMusic.IMusicItem | IVideo.IVideoItem): MediaType {
        // 如果有url，基于url检测
        if (mediaItem.url) {
            return this.detectMediaType(mediaItem.url);
        }
        
        // 如果有filePath，基于文件路径检测
        if ('filePath' in mediaItem && mediaItem.filePath) {
            return this.detectMediaType(mediaItem.filePath);
        }
        
        // 检查是否有视频特有的属性
        if ('resolution' in mediaItem || 'frameRate' in mediaItem) {
            return MediaType.VIDEO;
        }
        
        // 默认返回音频类型
        return MediaType.AUDIO;
    }

    /**
     * 检查是否为音频文件
     * @param urlOrPath 文件路径或URL
     * @returns 是否为音频文件
     */
    static isAudioFile(urlOrPath: string): boolean {
        return this.detectMediaType(urlOrPath) === MediaType.AUDIO;
    }

    /**
     * 检查是否为视频文件
     * @param urlOrPath 文件路径或URL
     * @returns 是否为视频文件
     */
    static isVideoFile(urlOrPath: string): boolean {
        return this.detectMediaType(urlOrPath) === MediaType.VIDEO;
    }

    /**
     * 获取支持的音频扩展名
     * @returns 音频扩展名数组
     */
    static getSupportedAudioExtensions(): string[] {
        return [...AUDIO_EXTENSIONS];
    }

    /**
     * 获取支持的视频扩展名
     * @returns 视频扩展名数组
     */
    static getSupportedVideoExtensions(): string[] {
        return [...VIDEO_EXTENSIONS];
    }

    /**
     * 获取所有支持的媒体扩展名
     * @returns 所有媒体扩展名数组
     */
    static getAllSupportedExtensions(): string[] {
        return [...AUDIO_EXTENSIONS, ...VIDEO_EXTENSIONS];
    }

    /**
     * 检查文件扩展名是否被支持
     * @param urlOrPath 文件路径或URL
     * @returns 是否被支持
     */
    static isSupportedMedia(urlOrPath: string): boolean {
        const ext = getUrlExt(urlOrPath).toLowerCase();
        return this.getAllSupportedExtensions().includes(ext);
    }
}

export default MediaRouter;