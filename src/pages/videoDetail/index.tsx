import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import Config from "@/core/config";
import useOrientation from "@/hooks/useOrientation";
import globalStyle from "@/constants/globalStyle";
import VideoPlayer from "@/core/videoPlayer";
import VideoPlayerComponent from "./components/videoPlayer";
import VideoControls from "./components/videoControls";
import VideoInfo from "./components/videoInfo";
import NavBar from "./components/navBar";
import Background from "./components/background";

export default function VideoDetail() {
    const orientation = useOrientation();
    const currentVideo = VideoPlayer.useCurrentVideo();
    const playbackState = VideoPlayer.usePlaybackState();
    const [showControls, setShowControls] = useState(true);
    const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const needAwake = Config.getConfig('basic.videoDetailAwake') || true;
        if (needAwake) {
            activateKeepAwakeAsync();
        }
        return () => {
            if (needAwake) {
                deactivateKeepAwake();
            }
        };
    }, []);

    // 自动隐藏控制面板
    useEffect(() => {
        if (showControls && playbackState.isPlaying) {
            if (controlsTimer) {
                clearTimeout(controlsTimer);
            }
            const timer = setTimeout(() => {
                setShowControls(false);
            }, 3000);
            setControlsTimer(timer);
        }

        return () => {
            if (controlsTimer) {
                clearTimeout(controlsTimer);
            }
        };
    }, [showControls, playbackState.isPlaying]);

    const handleVideoPress = () => {
        setShowControls(!showControls);
    };

    const handleVideoDoublePress = () => {
        if (playbackState.isPlaying) {
            VideoPlayer.pause();
        } else {
            VideoPlayer.resume();
        }
    };

    const handleVideoError = (error: any) => {
        Alert.alert('播放错误', `视频播放出现问题: ${error.message || '未知错误'}`);
    };

    if (!currentVideo) {
        return (
            <SafeAreaView style={globalStyle.fwflex1}>
                <StatusBar backgroundColor={'transparent'} />
                <View style={styles.container}>
                    <NavBar />
                    <VideoInfo message="请选择要播放的视频" />
                </View>
            </SafeAreaView>
        );
    }

    const isFullscreen = orientation === 'horizontal';

    return (
        <>
            <Background />
            <SafeAreaView style={globalStyle.fwflex1}>
                <StatusBar 
                    backgroundColor={'transparent'} 
                    hidden={isFullscreen}
                />
                <View style={[
                    styles.container,
                    isFullscreen && styles.fullscreenContainer
                ]}>
                    {!isFullscreen && <NavBar />}
                    
                    <View style={[
                        styles.videoContainer,
                        isFullscreen && styles.fullscreenVideoContainer
                    ]}>
                        <VideoPlayerComponent
                            video={currentVideo}
                            onPress={handleVideoPress}
                            onDoublePress={handleVideoDoublePress}
                            onError={handleVideoError}
                            style={styles.video}
                        />
                        
                        {showControls && (
                            <VideoControls
                                video={currentVideo}
                                playbackState={playbackState}
                                isFullscreen={isFullscreen}
                                onControlsTimeout={() => setShowControls(false)}
                            />
                        )}
                    </View>
                    
                    {!isFullscreen && (
                        <VideoInfo video={currentVideo} />
                    )}
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    fullscreenContainer: {
        backgroundColor: '#000',
    },
    videoContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullscreenVideoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    video: {
        width: '100%',
        height: '100%',
    },
});