import { produce } from "immer";
import { DeviceEventEmitter } from "react-native";
import { GlobalState } from "@/utils/stateMapper";
import delay from "@/utils/delay";
import { isSameMediaItem } from "@/utils/mediaItem";
import { EDeviceEvents } from "@/constants/commonConst";
import Config from "../config";
import MediaRouter, { MediaType } from "../mediaRouter";
import TrackPlayer from "../trackPlayer";
import { 
    videoCache, 
    videoErrorHandler, 
    videoPerformanceMonitor, 
    videoPreloader 
} from "../videoOptimization";

/** 视频播放模式 */
export enum VideoRepeatMode {
    /** 单个循环 */
    SINGLE = 'single',
    /** 列表循环 */
    QUEUE = 'queue',
    /** 随机播放 */
    SHUFFLE = 'shuffle',
}

/** 当前播放的视频 */
const currentVideoStore = new GlobalState<IVideo.IVideoItem | null>(null);

/** 视频播放模式 */
const repeatModeStore = new GlobalState<VideoRepeatMode>(VideoRepeatMode.QUEUE);

/** 视频质量 */
const qualityStore = new GlobalState<IVideo.IQualityKey>('standard');

/** 视频播放状态 */
const playbackStateStore = new GlobalState<IVideo.IVideoPlaybackState>({
    isPlaying: false,
    isPaused: false,
    isStopped: true,
    isLoading: false,
    isBuffering: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
    isFullscreen: false,
});

/** 视频播放配置 */
const configStore = new GlobalState<IVideo.IVideoPlaybackConfig>({
    autoPlay: true,
    defaultVolume: 1,
    rememberPosition: true,
    showControls: true,
    controlsTimeout: 3000,
    defaultOrientation: 'portrait',
    bufferSize: 15000,
    hardwareAcceleration: true,
    resizeMode: 'contain',
});

/** 视频播放列表 */
let videoPlayList: IVideo.IVideoItem[] = [];
let currentIndex = -1;

/** 视频播放器类 */
class VideoPlayer {
    private static instance: VideoPlayer;

    private constructor() {}

    public static getInstance(): VideoPlayer {
        if (!VideoPlayer.instance) {
            VideoPlayer.instance = new VideoPlayer();
        }
        return VideoPlayer.instance;
    }

    /**
     * 设置当前播放的视频
     * @param videoItem 视频项
     */
    setCurrentVideo(videoItem: IVideo.IVideoItem | null) {
        if (!videoItem) {
            currentIndex = -1;
            currentVideoStore.setValue(null);
            return;
        }

        currentIndex = this.getVideoIndex(videoItem);
        currentVideoStore.setValue(videoItem);
    }

    /**
     * 获取当前播放的视频
     * @returns 当前视频项
     */
    getCurrentVideo(): IVideo.IVideoItem | null {
        return currentVideoStore.getValue();
    }

    /**
     * 获取视频在播放列表中的索引
     * @param videoItem 视频项
     * @returns 索引位置
     */
    getVideoIndex(videoItem: IVideo.IVideoItem): number {
        return videoPlayList.findIndex(item => isSameMediaItem(item, videoItem));
    }

    /**
     * 检查视频是否在播放列表中
     * @param videoItem 视频项
     * @returns 是否在列表中
     */
    isInPlayList(videoItem: IVideo.IVideoItem): boolean {
        return this.getVideoIndex(videoItem) !== -1;
    }

    /**
     * 添加视频到播放列表
     * @param videoItems 视频数组
     * @param beforeIndex 插入位置
     */
    addToPlayList(videoItems: IVideo.IVideoItem[], beforeIndex?: number) {
        if (beforeIndex === undefined || beforeIndex < 0) {
            // 添加到列表末尾
            videoPlayList = videoPlayList.concat(
                videoItems.filter(item => !this.isInPlayList(item))
            );
        } else {
            // 插入到指定位置
            const before = videoPlayList.slice(0, beforeIndex);
            const after = videoPlayList.slice(beforeIndex);
            const newItems = videoItems.filter(item => !this.isInPlayList(item));
            videoPlayList = [...before, ...newItems, ...after];
        }

        // 更新当前索引
        const currentVideo = this.getCurrentVideo();
        if (currentVideo) {
            currentIndex = this.getVideoIndex(currentVideo);
        }
    }

    /**
     * 从播放列表移除视频
     * @param videoItem 要移除的视频
     */
    async removeFromPlayList(videoItem: IVideo.IVideoItem) {
        const targetIndex = this.getVideoIndex(videoItem);
        if (targetIndex === -1) return;

        const currentVideo = this.getCurrentVideo();
        let shouldPlayNext = false;

        // 如果移除的是当前播放的视频
        if (currentIndex === targetIndex) {
            shouldPlayNext = playbackStateStore.getValue().isPlaying;
            
            if (videoPlayList.length > 1) {
                // 播放下一个视频
                const nextVideo = this.getNextVideo();
                if (nextVideo) {
                    await this.play(nextVideo, shouldPlayNext);
                }
            } else {
                // 没有其他视频了，停止播放
                this.stop();
            }
        }

        // 从列表中移除
        videoPlayList = produce(videoPlayList, draft => {
            draft.splice(targetIndex, 1);
        });

        // 更新索引
        if (currentVideo) {
            currentIndex = this.getVideoIndex(currentVideo);
        }
    }

    /**
     * 清空播放列表
     */
    clearPlayList() {
        videoPlayList = [];
        currentIndex = -1;
        this.setCurrentVideo(null);
        this.stop();
    }

    /**
     * 获取播放列表
     * @returns 视频播放列表
     */
    getPlayList(): IVideo.IVideoItem[] {
        return [...videoPlayList];
    }

    /**
     * 获取指定位置的视频
     * @param index 索引
     * @returns 视频项或null
     */
    getVideoAt(index: number): IVideo.IVideoItem | null {
        if (index < 0 || index >= videoPlayList.length) {
            return null;
        }
        return videoPlayList[index];
    }

    /**
     * 获取下一个视频
     * @returns 下一个视频项或null
     */
    getNextVideo(): IVideo.IVideoItem | null {
        const repeatMode = repeatModeStore.getValue();
        
        if (repeatMode === VideoRepeatMode.SINGLE) {
            return this.getCurrentVideo();
        }
        
        return this.getVideoAt(currentIndex + 1);
    }

    /**
     * 获取上一个视频
     * @returns 上一个视频项或null
     */
    getPreviousVideo(): IVideo.IVideoItem | null {
        return this.getVideoAt(currentIndex - 1);
    }

    /**
     * 播放视频
     * @param videoItem 要播放的视频
     * @param autoPlay 是否自动播放
     */
    async play(videoItem?: IVideo.IVideoItem | null, autoPlay: boolean = true) {
        const startTime = Date.now();
        
        try {
            if (!videoItem) {
                videoItem = this.getCurrentVideo();
            }

            if (!videoItem) {
                throw new Error('没有可播放的视频');
            }

            // 检查缓存
            const cacheKey = `video_${videoItem.id}`;
            const cachedData = videoCache.get(cacheKey);
            if (cachedData) {
                console.log('使用缓存的视频数据');
            }

            // 如果不在播放列表中，添加进去
            if (!this.isInPlayList(videoItem)) {
                this.addToPlayList([videoItem]);
            }

            // 设置当前视频
            this.setCurrentVideo(videoItem);

            // 更新播放状态
            this.updatePlaybackState({
                isLoading: true,
                isStopped: false,
                error: undefined,
            });

            // 触发播放事件
            DeviceEventEmitter.emit(EDeviceEvents.VIDEO_PLAY_START, videoItem);

            // 模拟加载过程
            await delay(100);

            // 缓存视频数据
            if (!cachedData) {
                videoCache.set(cacheKey, {
                    videoItem,
                    cachedAt: Date.now(),
                });
            }

            // 预加载下一个视频
            const nextVideo = this.getNextVideo();
            if (nextVideo && nextVideo.id !== videoItem.id) {
                videoPreloader.addToPreloadQueue(nextVideo);
            }

            if (autoPlay) {
                this.updatePlaybackState({
                    isPlaying: true,
                    isPaused: false,
                    isLoading: false,
                });
            } else {
                this.updatePlaybackState({
                    isPlaying: false,
                    isPaused: true,
                    isLoading: false,
                });
            }

            // 记录加载时间
            const endTime = Date.now();
            videoPerformanceMonitor.recordLoadTime(startTime, endTime);

        } catch (error) {
            // 错误处理
            const errorResult = videoErrorHandler.handleError(error, {
                videoItem,
                operation: 'play',
                timestamp: Date.now(),
            });

            this.updatePlaybackState({
                isLoading: false,
                error: error.message,
            });

            // 如果需要重试
            if (errorResult.shouldRetry) {
                setTimeout(() => {
                    this.play(videoItem, autoPlay);
                }, errorResult.retryDelay);
            }

            // 执行备用操作
            if (errorResult.fallbackAction) {
                errorResult.fallbackAction();
            }

            throw error;
        }
    }

    /**
     * 播放并替换播放列表
     * @param videoItem 要播放的视频
     * @param newPlayList 新的播放列表
     */
    async playWithReplacePlayList(
        videoItem: IVideo.IVideoItem,
        newPlayList: IVideo.IVideoItem[]
    ) {
        if (newPlayList.length === 0) return;

        videoPlayList = [...newPlayList];
        await this.play(videoItem, true);
    }

    /**
     * 暂停播放
     */
    pause() {
        this.updatePlaybackState({
            isPlaying: false,
            isPaused: true,
        });
    }

    /**
     * 继续播放
     */
    resume() {
        this.updatePlaybackState({
            isPlaying: true,
            isPaused: false,
        });
    }

    /**
     * 停止播放
     */
    stop() {
        this.updatePlaybackState({
            isPlaying: false,
            isPaused: false,
            isStopped: true,
            currentTime: 0,
        });
    }

    /**
     * 跳转到下一个视频
     */
    async skipToNext() {
        const nextVideo = this.getNextVideo();
        if (nextVideo) {
            await this.play(nextVideo, true);
        }
    }

    /**
     * 跳转到上一个视频
     */
    async skipToPrevious() {
        const previousVideo = this.getPreviousVideo();
        if (previousVideo) {
            await this.play(previousVideo, true);
        }
    }

    /**
     * 设置播放模式
     * @param mode 播放模式
     */
    setRepeatMode(mode: VideoRepeatMode) {
        repeatModeStore.setValue(mode);
    }

    /**
     * 切换播放模式
     */
    toggleRepeatMode() {
        const currentMode = repeatModeStore.getValue();
        const nextMode = {
            [VideoRepeatMode.QUEUE]: VideoRepeatMode.SINGLE,
            [VideoRepeatMode.SINGLE]: VideoRepeatMode.SHUFFLE,
            [VideoRepeatMode.SHUFFLE]: VideoRepeatMode.QUEUE,
        }[currentMode];
        
        this.setRepeatMode(nextMode);
    }

    /**
     * 设置视频质量
     * @param quality 视频质量
     */
    setQuality(quality: IVideo.IQualityKey) {
        qualityStore.setValue(quality);
    }

    /**
     * 更新播放状态
     * @param newState 新的状态
     */
    private updatePlaybackState(newState: Partial<IVideo.IVideoPlaybackState>) {
        const currentState = playbackStateStore.getValue();
        playbackStateStore.setValue({ ...currentState, ...newState });
    }

    /**
     * 设置播放配置
     * @param config 配置项
     */
    setConfig(config: Partial<IVideo.IVideoPlaybackConfig>) {
        const currentConfig = configStore.getValue();
        configStore.setValue({ ...currentConfig, ...config });
    }

    // Hook方法
    useCurrentVideo = currentVideoStore.useValue;
    usePlaybackState = playbackStateStore.useValue;
    useRepeatMode = repeatModeStore.useValue;
    useQuality = qualityStore.useValue;
    useConfig = configStore.useValue;

    // 获取值方法
    getPlaybackState = playbackStateStore.getValue;
    getRepeatMode = repeatModeStore.getValue;
    getQuality = qualityStore.getValue;
    getConfig = configStore.getValue;
}

// 导出单例
const videoPlayerInstance = VideoPlayer.getInstance();

export default videoPlayerInstance;
export { VideoRepeatMode };