import React, { useRef, useEffect } from "react";
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
    GestureResponderEvent 
} from "react-native";
import VideoPlayer from "@/core/videoPlayer";

interface VideoPlayerComponentProps {
    video: IVideo.IVideoItem;
    onPress?: () => void;
    onDoublePress?: () => void;
    onError?: (error: any) => void;
    style?: any;
}

export default function VideoPlayerComponent({
    video,
    onPress,
    onDoublePress,
    onError,
    style
}: VideoPlayerComponentProps) {
    const lastTap = useRef<number>(0);
    const playbackState = VideoPlayer.usePlaybackState();

    const handlePress = (event: GestureResponderEvent) => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        
        if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
            // 双击事件
            onDoublePress?.();
        } else {
            // 单击事件
            setTimeout(() => {
                if (now - lastTap.current >= DOUBLE_PRESS_DELAY) {
                    onPress?.();
                }
            }, DOUBLE_PRESS_DELAY);
        }
        
        lastTap.current = now;
    };

    // TODO: 这里需要集成真正的视频播放组件 (react-native-video)
    // 由于当前环境没有安装依赖，这里使用占位组件
    const renderVideoPlayer = () => {
        return (
            <View style={[styles.videoPlayer, style]}>
                <View style={styles.placeholder}>
                    {/* 这里应该是 react-native-video 组件 */}
                    {/* 
                    <Video
                        source={{ uri: video.url }}
                        style={styles.video}
                        controls={false}
                        resizeMode={VideoPlayer.getConfig().resizeMode}
                        paused={!playbackState.isPlaying}
                        volume={playbackState.volume}
                        rate={playbackState.playbackRate}
                        onLoad={(data) => {
                            VideoPlayer.updatePlaybackState({
                                duration: data.duration,
                                isLoading: false,
                            });
                        }}
                        onProgress={(data) => {
                            VideoPlayer.updatePlaybackState({
                                currentTime: data.currentTime,
                            });
                        }}
                        onEnd={() => {
                            VideoPlayer.skipToNext();
                        }}
                        onError={(error) => {
                            onError?.(error);
                        }}
                        onBuffer={(meta) => {
                            VideoPlayer.updatePlaybackState({
                                isBuffering: meta.isBuffering,
                            });
                        }}
                    />
                    */}
                    <View style={styles.placeholderContent}>
                        <View style={styles.playIcon}>
                            <View style={styles.playTriangle} />
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.container, style]}>
                {renderVideoPlayer()}
                
                {playbackState.isLoading && (
                    <View style={styles.loadingOverlay}>
                        <View style={styles.loadingIndicator} />
                    </View>
                )}
                
                {playbackState.error && (
                    <View style={styles.errorOverlay}>
                        <View style={styles.errorContent}>
                            <View style={styles.errorIcon}>
                                <View style={styles.errorLine1} />
                                <View style={styles.errorLine2} />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 20,
        borderRightWidth: 0,
        borderBottomWidth: 15,
        borderTopWidth: 15,
        borderLeftColor: '#000',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginLeft: 5,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#fff',
        borderTopColor: 'transparent',
        // TODO: 添加旋转动画
    },
    errorOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorIcon: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    errorLine1: {
        width: 40,
        height: 3,
        backgroundColor: '#ff4444',
        transform: [{ rotate: '45deg' }],
        position: 'absolute',
    },
    errorLine2: {
        width: 40,
        height: 3,
        backgroundColor: '#ff4444',
        transform: [{ rotate: '-45deg' }],
        position: 'absolute',
    },
});