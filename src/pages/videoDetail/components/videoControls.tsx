import React, { useState, useEffect } from "react";
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Animated 
} from "react-native";
import { Slider } from "@react-native-community/slider";
import VideoPlayer from "@/core/videoPlayer";

interface VideoControlsProps {
    video: IVideo.IVideoItem;
    playbackState: IVideo.IVideoPlaybackState;
    isFullscreen: boolean;
    onControlsTimeout?: () => void;
}

export default function VideoControls({
    video,
    playbackState,
    isFullscreen,
    onControlsTimeout
}: VideoControlsProps) {
    const [seeking, setSeeking] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        // 控制面板淡入动画
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (playbackState.isPlaying) {
            VideoPlayer.pause();
        } else {
            VideoPlayer.resume();
        }
    };

    const handlePrevious = () => {
        VideoPlayer.skipToPrevious();
    };

    const handleNext = () => {
        VideoPlayer.skipToNext();
    };

    const handleSeekStart = () => {
        setSeeking(true);
    };

    const handleSeekComplete = (value: number) => {
        setSeeking(false);
        // TODO: 实现实际的跳转功能
        // VideoPlayer.seekTo(value);
    };

    const handleVolumeChange = (volume: number) => {
        // TODO: 实现音量控制
        // VideoPlayer.setVolume(volume);
    };

    const handleFullscreenToggle = () => {
        // TODO: 实现全屏切换
        // 这里需要配合屏幕方向控制
    };

    const renderPlayButton = () => {
        const isPlaying = playbackState.isPlaying;
        return (
            <TouchableOpacity 
                style={styles.controlButton}
                onPress={handlePlayPause}
            >
                <View style={[
                    styles.playPauseIcon,
                    isPlaying ? styles.pauseIcon : styles.playIcon
                ]}>
                    {isPlaying ? (
                        <View style={styles.pauseBars}>
                            <View style={styles.pauseBar} />
                            <View style={styles.pauseBar} />
                        </View>
                    ) : (
                        <View style={styles.playTriangle} />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const renderProgressBar = () => {
        const currentTime = seeking ? playbackState.currentTime : playbackState.currentTime;
        const duration = playbackState.duration || 1;
        const progress = currentTime / duration;

        return (
            <View style={styles.progressContainer}>
                <Text style={styles.timeText}>
                    {formatTime(currentTime)}
                </Text>
                <Slider
                    style={styles.progressSlider}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    onSlidingStart={handleSeekStart}
                    onSlidingComplete={handleSeekComplete}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                    thumbStyle={styles.sliderThumb}
                />
                <Text style={styles.timeText}>
                    {formatTime(duration)}
                </Text>
            </View>
        );
    };

    const renderVolumeControl = () => {
        return (
            <View style={styles.volumeContainer}>
                <TouchableOpacity style={styles.volumeButton}>
                    <View style={styles.volumeIcon}>
                        <View style={styles.volumeSpeaker} />
                        <View style={styles.volumeWave1} />
                        <View style={styles.volumeWave2} />
                    </View>
                </TouchableOpacity>
                <Slider
                    style={styles.volumeSlider}
                    minimumValue={0}
                    maximumValue={1}
                    value={playbackState.volume}
                    onValueChange={handleVolumeChange}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
                    thumbStyle={styles.sliderThumb}
                />
            </View>
        );
    };

    return (
        <Animated.View 
            style={[
                styles.container,
                isFullscreen && styles.fullscreenContainer,
                { opacity: fadeAnim }
            ]}
        >
            {/* 顶部控制栏 - 仅全屏时显示 */}
            {isFullscreen && (
                <View style={styles.topControls}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={handleFullscreenToggle}
                    >
                        <View style={styles.backIcon}>
                            <View style={styles.backArrow} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.titleText} numberOfLines={1}>
                        {video.title}
                    </Text>
                    <View style={styles.spacer} />
                </View>
            )}

            {/* 中央播放控制 */}
            <View style={styles.centerControls}>
                <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={handlePrevious}
                >
                    <View style={styles.skipIcon}>
                        <View style={styles.skipBar} />
                        <View style={[styles.skipTriangle, styles.skipPrevious]} />
                    </View>
                </TouchableOpacity>
                
                {renderPlayButton()}
                
                <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={handleNext}
                >
                    <View style={styles.skipIcon}>
                        <View style={[styles.skipTriangle, styles.skipNext]} />
                        <View style={styles.skipBar} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* 底部控制栏 */}
            <View style={styles.bottomControls}>
                {renderProgressBar()}
                
                <View style={styles.bottomRow}>
                    {!isFullscreen && renderVolumeControl()}
                    
                    <View style={styles.spacer} />
                    
                    <TouchableOpacity 
                        style={styles.fullscreenButton}
                        onPress={handleFullscreenToggle}
                    >
                        <View style={[
                            styles.fullscreenIcon,
                            isFullscreen && styles.fullscreenIconActive
                        ]}>
                            <View style={styles.fullscreenCorner1} />
                            <View style={styles.fullscreenCorner2} />
                            <View style={styles.fullscreenCorner3} />
                            <View style={styles.fullscreenCorner4} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    fullscreenContainer: {
        paddingTop: 40,
        paddingBottom: 40,
    },
    topControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backArrow: {
        width: 12,
        height: 12,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#fff',
        transform: [{ rotate: '45deg' }],
    },
    titleText: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    spacer: {
        flex: 1,
    },
    centerControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    playPauseIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {},
    pauseIcon: {},
    playTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 0,
        borderBottomWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: '#fff',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginLeft: 3,
    },
    pauseBars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 16,
    },
    pauseBar: {
        width: 5,
        height: 20,
        backgroundColor: '#fff',
    },
    skipIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 8,
        borderBottomWidth: 8,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    skipPrevious: {
        borderRightWidth: 12,
        borderRightColor: '#fff',
    },
    skipNext: {
        borderLeftWidth: 12,
        borderLeftColor: '#fff',
    },
    skipBar: {
        width: 2,
        height: 16,
        backgroundColor: '#fff',
    },
    bottomControls: {
        marginTop: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    timeText: {
        color: '#fff',
        fontSize: 12,
        minWidth: 40,
        textAlign: 'center',
    },
    progressSlider: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    volumeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    volumeButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    volumeIcon: {
        width: 20,
        height: 20,
        position: 'relative',
    },
    volumeSpeaker: {
        width: 8,
        height: 6,
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        top: 7,
    },
    volumeWave1: {
        width: 3,
        height: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#fff',
        position: 'absolute',
        left: 10,
        top: 5,
        borderRadius: 1,
    },
    volumeWave2: {
        width: 3,
        height: 14,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#fff',
        position: 'absolute',
        left: 15,
        top: 3,
        borderRadius: 1,
    },
    volumeSlider: {
        flex: 1,
        height: 30,
        marginLeft: 10,
    },
    fullscreenButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullscreenIcon: {
        width: 20,
        height: 20,
        position: 'relative',
    },
    fullscreenIconActive: {},
    fullscreenCorner1: {
        width: 6,
        height: 6,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    fullscreenCorner2: {
        width: 6,
        height: 6,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    fullscreenCorner3: {
        width: 6,
        height: 6,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    fullscreenCorner4: {
        width: 6,
        height: 6,
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    sliderThumb: {
        width: 16,
        height: 16,
        backgroundColor: '#fff',
    },
});