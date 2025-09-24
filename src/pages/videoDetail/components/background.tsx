import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import VideoPlayer from "@/core/videoPlayer";

export default function Background() {
    const currentVideo = VideoPlayer.useCurrentVideo();
    
    // 如果有缩略图，使用模糊背景
    if (currentVideo?.artwork || currentVideo?.thumbnailPath) {
        const imageSource = { 
            uri: currentVideo.thumbnailPath || currentVideo.artwork 
        };
        
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={imageSource}
                    style={styles.backgroundImage}
                    blurRadius={20}
                    resizeMode="cover"
                >
                    <View style={styles.overlay} />
                </ImageBackground>
            </View>
        );
    }
    
    // 默认纯黑背景
    return <View style={[styles.container, styles.defaultBackground]} />;
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    backgroundImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    defaultBackground: {
        backgroundColor: '#000',
    },
});