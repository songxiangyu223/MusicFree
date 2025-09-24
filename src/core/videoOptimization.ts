import { GlobalState } from "@/utils/stateMapper";

/** 视频缓存管理器 */
export class VideoCache {
    private static instance: VideoCache;
    private cache = new Map<string, any>();
    private maxCacheSize = 50; // 最大缓存数量

    private constructor() {}

    public static getInstance(): VideoCache {
        if (!VideoCache.instance) {
            VideoCache.instance = new VideoCache();
        }
        return VideoCache.instance;
    }

    /**
     * 添加到缓存
     * @param key 缓存键
     * @param value 缓存值
     */
    set(key: string, value: any) {
        // 如果缓存已满，删除最旧的项
        if (this.cache.size >= this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }

    /**
     * 从缓存获取
     * @param key 缓存键
     * @returns 缓存值
     */
    get(key: string): any {
        return this.cache.get(key);
    }

    /**
     * 检查是否存在
     * @param key 缓存键
     * @returns 是否存在
     */
    has(key: string): boolean {
        return this.cache.has(key);
    }

    /**
     * 删除缓存项
     * @param key 缓存键
     */
    delete(key: string) {
        this.cache.delete(key);
    }

    /**
     * 清空缓存
     */
    clear() {
        this.cache.clear();
    }

    /**
     * 获取缓存大小
     */
    size(): number {
        return this.cache.size;
    }
}

/** 视频性能监控 */
export class VideoPerformanceMonitor {
    private static instance: VideoPerformanceMonitor;
    private metrics = new GlobalState({
        loadTime: 0,
        bufferCount: 0,
        errorCount: 0,
        playbackQuality: 'unknown',
        networkSpeed: 0,
    });

    private constructor() {}

    public static getInstance(): VideoPerformanceMonitor {
        if (!VideoPerformanceMonitor.instance) {
            VideoPerformanceMonitor.instance = new VideoPerformanceMonitor();
        }
        return VideoPerformanceMonitor.instance;
    }

    /**
     * 记录视频加载时间
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    recordLoadTime(startTime: number, endTime: number) {
        const loadTime = endTime - startTime;
        const currentMetrics = this.metrics.getValue();
        this.metrics.setValue({
            ...currentMetrics,
            loadTime,
        });
    }

    /**
     * 增加缓冲次数
     */
    incrementBufferCount() {
        const currentMetrics = this.metrics.getValue();
        this.metrics.setValue({
            ...currentMetrics,
            bufferCount: currentMetrics.bufferCount + 1,
        });
    }

    /**
     * 增加错误次数
     */
    incrementErrorCount() {
        const currentMetrics = this.metrics.getValue();
        this.metrics.setValue({
            ...currentMetrics,
            errorCount: currentMetrics.errorCount + 1,
        });
    }

    /**
     * 更新播放质量
     * @param quality 播放质量
     */
    updatePlaybackQuality(quality: string) {
        const currentMetrics = this.metrics.getValue();
        this.metrics.setValue({
            ...currentMetrics,
            playbackQuality: quality,
        });
    }

    /**
     * 获取性能指标
     */
    getMetrics() {
        return this.metrics.getValue();
    }

    /**
     * 使用性能指标
     */
    useMetrics = this.metrics.useValue;
}

/** 视频错误处理器 */
export class VideoErrorHandler {
    private static instance: VideoErrorHandler;
    private errorHistory: Array<{
        error: any;
        timestamp: number;
        context: any;
    }> = [];
    private maxErrorHistory = 20;

    private constructor() {}

    public static getInstance(): VideoErrorHandler {
        if (!VideoErrorHandler.instance) {
            VideoErrorHandler.instance = new VideoErrorHandler();
        }
        return VideoErrorHandler.instance;
    }

    /**
     * 处理视频错误
     * @param error 错误对象
     * @param context 错误上下文
     * @returns 错误处理结果
     */
    handleError(error: any, context?: any): {
        shouldRetry: boolean;
        retryDelay: number;
        fallbackAction?: () => void;
    } {
        // 记录错误
        this.recordError(error, context);

        // 根据错误类型决定处理策略
        const errorType = this.classifyError(error);
        
        switch (errorType) {
            case 'NETWORK_ERROR':
                return {
                    shouldRetry: true,
                    retryDelay: 2000,
                };
            
            case 'CODEC_ERROR':
                return {
                    shouldRetry: false,
                    retryDelay: 0,
                    fallbackAction: () => {
                        // 尝试降级质量
                        console.log('尝试降级视频质量');
                    }
                };
            
            case 'SOURCE_ERROR':
                return {
                    shouldRetry: true,
                    retryDelay: 1000,
                    fallbackAction: () => {
                        // 尝试备用源
                        console.log('尝试备用视频源');
                    }
                };
            
            default:
                return {
                    shouldRetry: false,
                    retryDelay: 0,
                };
        }
    }

    /**
     * 记录错误
     * @param error 错误对象
     * @param context 错误上下文
     */
    private recordError(error: any, context?: any) {
        const errorRecord = {
            error,
            timestamp: Date.now(),
            context,
        };

        this.errorHistory.push(errorRecord);

        // 保持错误历史记录在限制范围内
        if (this.errorHistory.length > this.maxErrorHistory) {
            this.errorHistory.shift();
        }

        // 更新性能监控
        VideoPerformanceMonitor.getInstance().incrementErrorCount();
    }

    /**
     * 分类错误类型
     * @param error 错误对象
     * @returns 错误类型
     */
    private classifyError(error: any): string {
        const errorMessage = error?.message?.toLowerCase() || '';
        
        if (errorMessage.includes('network') || errorMessage.includes('timeout')) {
            return 'NETWORK_ERROR';
        }
        
        if (errorMessage.includes('codec') || errorMessage.includes('format')) {
            return 'CODEC_ERROR';
        }
        
        if (errorMessage.includes('source') || errorMessage.includes('url')) {
            return 'SOURCE_ERROR';
        }
        
        return 'UNKNOWN_ERROR';
    }

    /**
     * 获取错误历史
     */
    getErrorHistory() {
        return [...this.errorHistory];
    }

    /**
     * 清空错误历史
     */
    clearErrorHistory() {
        this.errorHistory = [];
    }
}

/** 视频预加载管理器 */
export class VideoPreloader {
    private static instance: VideoPreloader;
    private preloadQueue: IVideo.IVideoItem[] = [];
    private maxPreloadCount = 3;

    private constructor() {}

    public static getInstance(): VideoPreloader {
        if (!VideoPreloader.instance) {
            VideoPreloader.instance = new VideoPreloader();
        }
        return VideoPreloader.instance;
    }

    /**
     * 添加到预加载队列
     * @param video 视频项
     */
    addToPreloadQueue(video: IVideo.IVideoItem) {
        const exists = this.preloadQueue.find(v => v.id === video.id);
        if (!exists && this.preloadQueue.length < this.maxPreloadCount) {
            this.preloadQueue.push(video);
            this.startPreload(video);
        }
    }

    /**
     * 开始预加载
     * @param video 视频项
     */
    private async startPreload(video: IVideo.IVideoItem) {
        try {
            // TODO: 实现实际的预加载逻辑
            // 这里可以预加载视频的元数据、缩略图等
            console.log(`开始预加载视频: ${video.title}`);
            
            // 模拟预加载延迟
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 预加载完成后从队列中移除
            this.removeFromPreloadQueue(video.id);
            
        } catch (error) {
            console.error('视频预加载失败:', error);
            this.removeFromPreloadQueue(video.id);
        }
    }

    /**
     * 从预加载队列中移除
     * @param videoId 视频ID
     */
    private removeFromPreloadQueue(videoId: string) {
        this.preloadQueue = this.preloadQueue.filter(v => v.id !== videoId);
    }

    /**
     * 清空预加载队列
     */
    clearPreloadQueue() {
        this.preloadQueue = [];
    }

    /**
     * 获取预加载队列状态
     */
    getPreloadQueueStatus() {
        return {
            count: this.preloadQueue.length,
            videos: [...this.preloadQueue],
        };
    }
}

// 导出单例
export const videoCache = VideoCache.getInstance();
export const videoPerformanceMonitor = VideoPerformanceMonitor.getInstance();
export const videoErrorHandler = VideoErrorHandler.getInstance();
export const videoPreloader = VideoPreloader.getInstance();