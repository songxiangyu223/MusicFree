import { DeviceEventEmitter } from "react-native";
import { GlobalState } from "@/utils/stateMapper";
import { EDeviceEvents } from "@/constants/commonConst";
import MediaRouter, { MediaType } from "./mediaRouter";
import TrackPlayer from "./trackPlayer";
import VideoPlayer from "./videoPlayer";

/** 当前媒体类型 */
export enum CurrentMediaType {
    NONE = 'none',
    AUDIO = 'audio',
    VIDEO = 'video'
}

/** 统一的播放状态 */
export interface IUnifiedPlaybackState {
    mediaType: CurrentMediaType;
    isPlaying: boolean;
    isPaused: boolean;
    isStopped: boolean;
    isLoading: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    playbackRate: number;
    error?: string;
}

/** 当前媒体类型状态 */
const currentMediaTypeStore = new GlobalState<CurrentMediaType>(CurrentMediaType.NONE);

/** 统一播放状态 */
const unifiedPlaybackStateStore = new GlobalState<IUnifiedPlaybackState>({
    mediaType: CurrentMediaType.NONE,
    isPlaying: false,
    isPaused: false,
    isStopped: true,
    isLoading: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackRate: 1,
});

/** 媒体播放管理器 */
class MediaPlaybackManager {
    private static instance: MediaPlaybackManager;

    private constructor() {
        this.setupEventListeners();
    }

    public static getInstance(): MediaPlaybackManager {
        if (!MediaPlaybackManager.instance) {
            MediaPlaybackManager.instance = new MediaPlaybackManager();
        }
        return MediaPlaybackManager.instance;
    }

    private setupEventListeners() {
        // 监听音频播放状态变化
        TrackPlayer.useCurrentMusic.subscribe((currentMusic) => {
            if (currentMusic) {
                this.switchToAudio();
            } else if (currentMediaTypeStore.getValue() === CurrentMediaType.AUDIO) {
                this.switchToNone();
            }
        });

        // 监听视频播放状态变化
        VideoPlayer.useCurrentVideo.subscribe((currentVideo) => {
            if (currentVideo) {
                this.switchToVideo();
            } else if (currentMediaTypeStore.getValue() === CurrentMediaType.VIDEO) {
                this.switchToNone();
            }
        });

        // 监听设备事件
        DeviceEventEmitter.addListener(EDeviceEvents.VIDEO_PLAY_START, () => {
            this.switchToVideo();
        });
    }

    /**
     * 切换到音频播放模式
     */
    private switchToAudio() {
        const prevType = currentMediaTypeStore.getValue();
        
        // 如果当前是视频模式，暂停视频
        if (prevType === CurrentMediaType.VIDEO) {
            VideoPlayer.pause();
        }

        currentMediaTypeStore.setValue(CurrentMediaType.AUDIO);
        this.updateUnifiedState();
        
        DeviceEventEmitter.emit(EDeviceEvents.MEDIA_TYPE_CHANGE, {
            from: prevType,
            to: CurrentMediaType.AUDIO
        });
    }

    /**
     * 切换到视频播放模式
     */
    private switchToVideo() {
        const prevType = currentMediaTypeStore.getValue();
        
        // 如果当前是音频模式，暂停音频
        if (prevType === CurrentMediaType.AUDIO) {
            TrackPlayer.pause();
        }

        currentMediaTypeStore.setValue(CurrentMediaType.VIDEO);
        this.updateUnifiedState();
        
        DeviceEventEmitter.emit(EDeviceEvents.MEDIA_TYPE_CHANGE, {
            from: prevType,
            to: CurrentMediaType.VIDEO
        });
    }

    /**
     * 切换到无播放状态
     */
    private switchToNone() {
        const prevType = currentMediaTypeStore.getValue();
        currentMediaTypeStore.setValue(CurrentMediaType.NONE);
        this.updateUnifiedState();
        
        DeviceEventEmitter.emit(EDeviceEvents.MEDIA_TYPE_CHANGE, {
            from: prevType,
            to: CurrentMediaType.NONE
        });
    }

    /**
     * 更新统一播放状态
     */
    private updateUnifiedState() {
        const mediaType = currentMediaTypeStore.getValue();
        let state: IUnifiedPlaybackState;

        switch (mediaType) {
            case CurrentMediaType.AUDIO:
                const musicState = TrackPlayer.useMusicState();
                const progress = TrackPlayer.getProgress();
                state = {
                    mediaType,
                    isPlaying: musicState === 'playing',
                    isPaused: musicState === 'paused',
                    isStopped: musicState === 'stopped',
                    isLoading: musicState === 'loading' || musicState === 'buffering',
                    currentTime: progress?.position || 0,
                    duration: progress?.duration || 0,
                    volume: 1, // TrackPlayer doesn't expose volume directly
                    playbackRate: TrackPlayer.getRate?.() || 1,
                };
                break;

            case CurrentMediaType.VIDEO:
                const videoState = VideoPlayer.getPlaybackState();
                state = {
                    mediaType,
                    isPlaying: videoState.isPlaying,
                    isPaused: videoState.isPaused,
                    isStopped: videoState.isStopped,
                    isLoading: videoState.isLoading || videoState.isBuffering,
                    currentTime: videoState.currentTime,
                    duration: videoState.duration,
                    volume: videoState.volume,
                    playbackRate: videoState.playbackRate,
                    error: videoState.error,
                };
                break;

            default:
                state = {
                    mediaType: CurrentMediaType.NONE,
                    isPlaying: false,
                    isPaused: false,
                    isStopped: true,
                    isLoading: false,
                    currentTime: 0,
                    duration: 0,
                    volume: 1,
                    playbackRate: 1,
                };
        }

        unifiedPlaybackStateStore.setValue(state);
    }

    /**
     * 播放媒体项（自动检测类型）
     * @param mediaItem 媒体项
     * @param forcePlay 是否强制播放
     */
    async playMedia(
        mediaItem: IMusic.IMusicItem | IVideo.IVideoItem,
        forcePlay: boolean = true
    ) {
        const mediaType = MediaRouter.detectMediaItemType(mediaItem);
        
        if (mediaType === MediaType.VIDEO) {
            await VideoPlayer.play(mediaItem as IVideo.IVideoItem, forcePlay);
        } else {
            await TrackPlayer.play(mediaItem as IMusic.IMusicItem, forcePlay);
        }
    }

    /**
     * 暂停当前播放
     */
    pause() {
        const mediaType = currentMediaTypeStore.getValue();
        
        switch (mediaType) {
            case CurrentMediaType.AUDIO:
                TrackPlayer.pause();
                break;
            case CurrentMediaType.VIDEO:
                VideoPlayer.pause();
                break;
        }
    }

    /**
     * 继续播放
     */
    resume() {
        const mediaType = currentMediaTypeStore.getValue();
        
        switch (mediaType) {
            case CurrentMediaType.AUDIO:
                TrackPlayer.play();
                break;
            case CurrentMediaType.VIDEO:
                VideoPlayer.resume();
                break;
        }
    }

    /**
     * 停止播放
     */
    stop() {
        const mediaType = currentMediaTypeStore.getValue();
        
        switch (mediaType) {
            case CurrentMediaType.AUDIO:
                TrackPlayer.reset();
                break;
            case CurrentMediaType.VIDEO:
                VideoPlayer.stop();
                break;
        }
    }

    /**
     * 跳转到下一个
     */
    async skipToNext() {
        const mediaType = currentMediaTypeStore.getValue();
        
        switch (mediaType) {
            case CurrentMediaType.AUDIO:
                await TrackPlayer.skipToNext();
                break;
            case CurrentMediaType.VIDEO:
                await VideoPlayer.skipToNext();
                break;
        }
    }

    /**
     * 跳转到上一个
     */
    async skipToPrevious() {
        const mediaType = currentMediaTypeStore.getValue();
        
        switch (mediaType) {
            case CurrentMediaType.AUDIO:
                await TrackPlayer.skipToPrevious();
                break;
            case CurrentMediaType.VIDEO:
                await VideoPlayer.skipToPrevious();
                break;
        }
    }

    /**
     * 获取当前播放的媒体项
     */
    getCurrentMedia(): IMusic.IMusicItem | IVideo.IVideoItem | null {
        const mediaType = currentMediaTypeStore.getValue();
        
        switch (mediaType) {
            case CurrentMediaType.AUDIO:
                return TrackPlayer.getCurrentMusic();
            case CurrentMediaType.VIDEO:
                return VideoPlayer.getCurrentVideo();
            default:
                return null;
        }
    }

    /**
     * 获取当前媒体类型
     */
    getCurrentMediaType(): CurrentMediaType {
        return currentMediaTypeStore.getValue();
    }

    /**
     * 检查是否正在播放
     */
    isPlaying(): boolean {
        return unifiedPlaybackStateStore.getValue().isPlaying;
    }

    /**
     * 检查是否暂停
     */
    isPaused(): boolean {
        return unifiedPlaybackStateStore.getValue().isPaused;
    }

    // Hook 方法
    useCurrentMediaType = currentMediaTypeStore.useValue;
    useUnifiedPlaybackState = unifiedPlaybackStateStore.useValue;
}

// 导出单例
const mediaPlaybackManager = MediaPlaybackManager.getInstance();

export default mediaPlaybackManager;
export { CurrentMediaType };