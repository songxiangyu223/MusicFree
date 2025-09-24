import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigate } from "@/core/router";
import VideoPlayer from "@/core/videoPlayer";

export default function NavBar() {
    const navigate = useNavigate();
    const currentVideo = VideoPlayer.useCurrentVideo();
    const playList = VideoPlayer.getPlayList();

    const handleBack = () => {
        navigate('home');
    };

    const handlePlayListPress = () => {
        // TODO: 打开播放列表面板
    };

    const renderBackButton = () => {
        return (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <View style={styles.backIcon}>
                    <View style={styles.backArrow} />
                </View>
            </TouchableOpacity>
        );
    };

    const renderTitle = () => {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.titleText} numberOfLines={1}>
                    {currentVideo?.title || '视频播放'}
                </Text>
                {playList.length > 0 && (
                    <Text style={styles.subtitleText}>
                        播放列表 · {playList.length} 个视频
                    </Text>
                )}
            </View>
        );
    };

    const renderPlayListButton = () => {
        if (playList.length === 0) return null;

        return (
            <TouchableOpacity 
                style={styles.playListButton} 
                onPress={handlePlayListPress}
            >
                <View style={styles.playListIcon}>
                    <View style={styles.playListLine1} />
                    <View style={styles.playListLine2} />
                    <View style={styles.playListLine3} />
                </View>
                <Text style={styles.playListText}>{playList.length}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {renderBackButton()}
            {renderTitle()}
            {renderPlayListButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
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
    titleContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    titleText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitleText: {
        color: '#999',
        fontSize: 12,
        marginTop: 2,
    },
    playListButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        marginLeft: 8,
    },
    playListIcon: {
        width: 16,
        height: 16,
        justifyContent: 'space-between',
        marginRight: 6,
    },
    playListLine1: {
        width: 16,
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 1,
    },
    playListLine2: {
        width: 12,
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 1,
    },
    playListLine3: {
        width: 8,
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 1,
    },
    playListText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
});