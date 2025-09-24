import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

interface VideoInfoProps {
    video?: IVideo.IVideoItem | null;
    message?: string;
}

export default function VideoInfo({ video, message }: VideoInfoProps) {
    const formatFileSize = (bytes?: number): string => {
        if (!bytes) return '未知大小';
        
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
    };

    const formatDuration = (seconds?: number): string => {
        if (!seconds) return '00:00';
        
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatResolution = (resolution?: { width: number; height: number }): string => {
        if (!resolution) return '未知分辨率';
        return `${resolution.width} × ${resolution.height}`;
    };

    if (message) {
        return (
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{message}</Text>
                </View>
            </View>
        );
    }

    if (!video) {
        return null;
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* 视频标题 */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText} numberOfLines={2}>
                    {video.title || '未知标题'}
                </Text>
                {video.alias && (
                    <Text style={styles.aliasText} numberOfLines={1}>
                        {video.alias}
                    </Text>
                )}
            </View>

            {/* 基本信息 */}
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>时长</Text>
                        <Text style={styles.infoValue}>{formatDuration(video.duration)}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>大小</Text>
                        <Text style={styles.infoValue}>{formatFileSize(video.fileSize)}</Text>
                    </View>
                </View>
                
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>分辨率</Text>
                        <Text style={styles.infoValue}>{formatResolution(video.resolution)}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>播放次数</Text>
                        <Text style={styles.infoValue}>{video.watchCount || 0} 次</Text>
                    </View>
                </View>
            </View>

            {/* 技术参数 */}
            {(video.frameRate || video.bitrate || video.codec) && (
                <View style={styles.techContainer}>
                    <Text style={styles.sectionTitle}>技术参数</Text>
                    
                    {video.frameRate && (
                        <View style={styles.techRow}>
                            <Text style={styles.techLabel}>帧率</Text>
                            <Text style={styles.techValue}>{video.frameRate} fps</Text>
                        </View>
                    )}
                    
                    {video.bitrate && (
                        <View style={styles.techRow}>
                            <Text style={styles.techLabel}>码率</Text>
                            <Text style={styles.techValue}>{Math.round(video.bitrate / 1000)} kbps</Text>
                        </View>
                    )}
                    
                    {video.codec && (
                        <View style={styles.techRow}>
                            <Text style={styles.techLabel}>编码</Text>
                            <Text style={styles.techValue}>{video.codec}</Text>
                        </View>
                    )}
                </View>
            )}

            {/* 文件信息 */}
            {(video.filePath || video.mimeType) && (
                <View style={styles.fileContainer}>
                    <Text style={styles.sectionTitle}>文件信息</Text>
                    
                    {video.filePath && (
                        <View style={styles.fileRow}>
                            <Text style={styles.fileLabel}>路径</Text>
                            <Text style={styles.fileValue} numberOfLines={2}>
                                {video.filePath}
                            </Text>
                        </View>
                    )}
                    
                    {video.mimeType && (
                        <View style={styles.fileRow}>
                            <Text style={styles.fileLabel}>类型</Text>
                            <Text style={styles.fileValue}>{video.mimeType}</Text>
                        </View>
                    )}
                    
                    {video.dateAdded && (
                        <View style={styles.fileRow}>
                            <Text style={styles.fileLabel}>添加时间</Text>
                            <Text style={styles.fileValue}>
                                {new Date(video.dateAdded).toLocaleString()}
                            </Text>
                        </View>
                    )}
                </View>
            )}

            {/* 播放信息 */}
            {video.lastPosition && (
                <View style={styles.playbackContainer}>
                    <Text style={styles.sectionTitle}>播放记录</Text>
                    
                    <View style={styles.playbackRow}>
                        <Text style={styles.playbackLabel}>上次播放位置</Text>
                        <Text style={styles.playbackValue}>
                            {formatDuration(video.lastPosition)}
                        </Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 16,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        color: '#999',
        fontSize: 16,
        textAlign: 'center',
    },
    titleContainer: {
        marginBottom: 20,
    },
    titleText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 26,
    },
    aliasText: {
        color: '#999',
        fontSize: 14,
        marginTop: 4,
        fontStyle: 'italic',
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    infoItem: {
        flex: 1,
        marginRight: 16,
    },
    infoLabel: {
        color: '#999',
        fontSize: 12,
        marginBottom: 4,
    },
    infoValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    techContainer: {
        marginBottom: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    techRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    techLabel: {
        color: '#999',
        fontSize: 14,
    },
    techValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    fileContainer: {
        marginBottom: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    fileRow: {
        marginBottom: 12,
    },
    fileLabel: {
        color: '#999',
        fontSize: 12,
        marginBottom: 4,
    },
    fileValue: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 18,
    },
    playbackContainer: {
        marginBottom: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    playbackRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    playbackLabel: {
        color: '#999',
        fontSize: 14,
    },
    playbackValue: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});