declare namespace IVideo {
    export interface IVideoItemBase extends ICommon.IMediaBase {
        /** 其他属性 */
        [k: keyof IVideoItem]: IVideoItem[k];
    }

    /** 视频质量 */
    export type IQualityKey = 'low' | 'standard' | 'high' | 'super';
    export type IQuality = Record<
        IQualityKey,
        {
            url?: string;
            size?: string | number;
        }
    >;

    // 视频源定义
    export interface IVideoSource {
        headers?: Record<string, string>;
        /** 视频播放地址 */
        url?: string;
        /** UA */
        userAgent?: string;
        /** 视频质量 */
        quality?: IVideo.IQualityKey;
        /** 文件大小 */
        size?: number;
    }

    export interface IVideoItem {
        /** 视频在平台的唯一编号 */
        id: string;
        /** 平台 */
        platform: string;
        /** 标题 */
        title: string;
        /** 别名 */
        alias?: string;
        /** 时长(s) */
        duration: number;
        /** 缩略图 */
        artwork: string;
        /** 默认视频源 */
        url?: string;
        /** 视频源 */
        source?: Partial<Record<IQualityKey, IVideoSource>>;
        /** 质量信息 */
        qualities?: IQuality;
        
        /** 视频技术参数 */
        resolution?: {
            width: number;
            height: number;
        };
        frameRate?: number;
        bitrate?: number;
        codec?: string;
        
        /** 文件信息 */
        filePath?: string;
        thumbnailPath?: string;
        mimeType?: string;
        fileSize?: number;
        
        /** 播放信息 */
        lastPosition?: number;
        watchCount?: number;
        dateAdded?: number;
        dateModified?: number;
        
        /** 其他可以被序列化的信息 */
        [k: string]: any;
        /** 内部信息 */
        [k: symbol]: any;
    }

    export interface IVideoItemCache extends IVideoItem {
        $localThumbnail?: string;
    }

    /** 视频播放配置 */
    export interface IVideoPlaybackConfig {
        /** 播放偏好设置 */
        autoPlay: boolean;
        defaultVolume: number;
        rememberPosition: boolean;
        
        /** 界面设置 */
        showControls: boolean;
        controlsTimeout: number;
        defaultOrientation: 'portrait' | 'landscape';
        
        /** 性能设置 */
        bufferSize: number;
        hardwareAcceleration: boolean;
        resizeMode: 'contain' | 'cover' | 'stretch';
    }

    /** 视频播放状态 */
    export interface IVideoPlaybackState {
        isPlaying: boolean;
        isPaused: boolean;
        isStopped: boolean;
        isLoading: boolean;
        isBuffering: boolean;
        currentTime: number;
        duration: number;
        volume: number;
        playbackRate: number;
        isFullscreen: boolean;
        error?: string;
    }
}