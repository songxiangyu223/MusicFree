import React, { useEffect } from "react";
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    ScrollView,
    Alert 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigate } from "@/core/router";
import MediaPlaybackManager, { CurrentMediaType } from "@/core/mediaPlaybackManager";
import VideoPlayer from "@/core/videoPlayer";
import LocalVideoSheet from "@/core/localVideoSheet";
import MediaRouter, { MediaType } from "@/core/mediaRouter";

export default function VideoTestPage() {
    const navigate = useNavigate();
    const currentMediaType = MediaPlaybackManager.useCurrentMediaType();
    const unifiedState = MediaPlaybackManager.useUnifiedPlaybackState();
    const currentVideo = VideoPlayer.useCurrentVideo();
    const videoList = LocalVideoSheet.useVideoList();

    useEffect(() => {
        // 初始化本地视频数据
        LocalVideoSheet.setup();
    }, []);

    const handleCreateSampleVideo = () => {
        const sampleVideo: IVideo.IVideoItem = {
            id: 'sample-video-1',
            platform: '本地',
            title: '示例视频 - Big Buck Bunny',
            duration: 596,
            artwork: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
            url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            resolution: {
                width: 1920,
                height: 1080
            },
            frameRate: 24,
            bitrate: 5000000,
            codec: 'H.264',
            mimeType: 'video/mp4',
            fileSize: 158582400,
            dateAdded: Date.now(),
        };

        LocalVideoSheet.addVideo(sampleVideo);
        Alert.alert('成功', '已添加示例视频');
    };

    const handlePlayVideo = (video: IVideo.IVideoItem) => {
        VideoPlayer.play(video, true).then(() => {
            navigate('video-detail');
        }).catch((error) => {
            Alert.alert('播放失败', error.message);
        });
    };

    const handleTestMediaRouter = () => {
        const testUrls = [
            'test.mp4',
            'test.mkv',
            'test.mp3',
            'test.flac',
            'https://example.com/video.mp4',
            'https://example.com/audio.mp3',
        ];

        const results = testUrls.map(url => ({
            url,
            type: MediaRouter.detectMediaType(url),
            isVideo: MediaRouter.isVideoFile(url),
            isAudio: MediaRouter.isAudioFile(url),
        }));

        Alert.alert(
            '媒体路由器测试结果',
            results.map(r => `${r.url}: ${r.type} (视频:${r.isVideo}, 音频:${r.isAudio})`).join('\n')
        );
    };

    const handleGoToVideoDetail = () => {
        navigate('video-detail');
    };

    const renderCurrentStatus = () => {
        return (
            <View style={styles.statusContainer}>
                <Text style={styles.sectionTitle}>当前播放状态</Text>
                <Text style={styles.statusText}>媒体类型: {currentMediaType}</Text>
                <Text style={styles.statusText}>播放状态: {unifiedState.isPlaying ? '播放中' : unifiedState.isPaused ? '暂停' : '停止'}</Text>
                <Text style={styles.statusText}>当前时间: {Math.round(unifiedState.currentTime)}s</Text>
                <Text style={styles.statusText}>总时长: {Math.round(unifiedState.duration)}s</Text>
                {currentVideo && (
                    <Text style={styles.statusText}>当前视频: {currentVideo.title}</Text>
                )}
            </View>
        );
    };

    const renderPlaybackControls = () => {
        return (
            <View style={styles.controlsContainer}>
                <Text style={styles.sectionTitle}>播放控制</Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity 
                        style={styles.controlButton}
                        onPress={() => MediaPlaybackManager.pause()}
                    >
                        <Text style={styles.buttonText}>暂停</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.controlButton}
                        onPress={() => MediaPlaybackManager.resume()}
                    >
                        <Text style={styles.buttonText}>继续</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.controlButton}
                        onPress={() => MediaPlaybackManager.stop()}
                    >
                        <Text style={styles.buttonText}>停止</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity 
                        style={styles.controlButton}
                        onPress={() => MediaPlaybackManager.skipToPrevious()}
                    >
                        <Text style={styles.buttonText}>上一个</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.controlButton}
                        onPress={() => MediaPlaybackManager.skipToNext()}
                    >
                        <Text style={styles.buttonText}>下一个</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderVideoList = () => {
        return (
            <View style={styles.videoListContainer}>
                <Text style={styles.sectionTitle}>视频列表 ({videoList.length})</Text>
                {videoList.length === 0 ? (
                    <Text style={styles.emptyText}>暂无视频</Text>
                ) : (
                    videoList.map((video) => (
                        <TouchableOpacity
                            key={video.id}
                            style={styles.videoItem}
                            onPress={() => handlePlayVideo(video)}
                        >
                            <Text style={styles.videoTitle}>{video.title}</Text>
                            <Text style={styles.videoInfo}>
                                {Math.round(video.duration)}s | {video.resolution?.width}x{video.resolution?.height}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        );
    };

    const renderTestButtons = () => {
        return (
            <View style={styles.testContainer}>
                <Text style={styles.sectionTitle}>测试功能</Text>
                <TouchableOpacity 
                    style={styles.testButton}
                    onPress={handleCreateSampleVideo}
                >
                    <Text style={styles.buttonText}>添加示例视频</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.testButton}
                    onPress={handleTestMediaRouter}
                >
                    <Text style={styles.buttonText}>测试媒体路由器</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.testButton}
                    onPress={handleGoToVideoDetail}
                >
                    <Text style={styles.buttonText}>打开视频播放页</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.testButton, styles.clearButton]}
                    onPress={() => {
                        VideoPlayer.clearPlayList();
                        LocalVideoSheet.updateVideoList([]);
                    }}
                >
                    <Text style={styles.buttonText}>清空视频列表</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>视频播放功能测试</Text>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigate('home')}
                    >
                        <Text style={styles.buttonText}>返回</Text>
                    </TouchableOpacity>
                </View>

                {renderCurrentStatus()}
                {renderPlaybackControls()}
                {renderVideoList()}
                {renderTestButtons()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#333',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    statusContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    statusText: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 4,
    },
    controlsContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
    },
    controlButton: {
        backgroundColor: '#444',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    videoListContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    emptyText: {
        color: '#999',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 20,
    },
    videoItem: {
        backgroundColor: '#222',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    videoTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    videoInfo: {
        color: '#999',
        fontSize: 12,
    },
    testContainer: {
        padding: 16,
    },
    testButton: {
        backgroundColor: '#0066cc',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: '#cc4444',
    },
});