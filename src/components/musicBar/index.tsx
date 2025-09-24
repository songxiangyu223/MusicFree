import React, {memo, useEffect, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import rpx from '@/utils/rpx';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {showPanel} from '../panels/usePanel';
import useColors from '@/hooks/useColors';
import IconButton from '../base/iconButton';
import TrackPlayer from '@/core/trackPlayer';
import {musicIsPaused} from '@/utils/trackUtils';
import MusicInfo from './musicInfo';
import Icon from '@/components/base/icon.tsx';
import AnimatedPlayButton from '../base/animatedPlayButton';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

function CircularPlayBtn() {
    const progress = TrackPlayer.useProgress();
    const musicState = TrackPlayer.useMusicState();
    const colors = useColors();

    const isPaused = musicIsPaused(musicState);
    
    // 动画相关的shared values
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const pulseScale = useSharedValue(1);
    
    // 播放状态变化时的动画
    useEffect(() => {
        // 状态切换时的旋转动画
        rotation.value = withSequence(
            withTiming(180, {duration: 200}),
            withTiming(360, {duration: 200}),
            withTiming(0, {duration: 0})
        );
        
        // 脉冲动画（播放时）
        if (!isPaused) {
            const pulseAnimation = () => {
                pulseScale.value = withSequence(
                    withSpring(1.05, {damping: 10}),
                    withSpring(1, {damping: 10})
                );
            };
            
            const interval = setInterval(pulseAnimation, 2000);
            return () => clearInterval(interval);
        }
    }, [isPaused]);
    
    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value * pulseScale.value},
                {rotate: `${rotation.value}deg`}
            ],
        };
    });
    
    // 按下时的动画
    const handlePressIn = () => {
        scale.value = withSpring(0.9, {
            damping: 15,
            stiffness: 300,
        });
    };
    
    // 释放时的动画
    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 300,
        });
    };

    return (
        <Animated.View style={animatedStyle}>
            <CircularProgressBase
                activeStrokeWidth={rpx(4)}
                inActiveStrokeWidth={rpx(2)}
                inActiveStrokeOpacity={0.2}
                value={
                    progress?.duration
                        ? (100 * progress.position) / progress.duration
                        : 0
                }
                duration={100}
                radius={rpx(36)}
                activeStrokeColor={colors.musicBarText}
                inActiveStrokeColor={colors.textSecondary}>
                <AnimatedPlayButton
                    accessibilityLabel={'播放或暂停歌曲'}
                    isPaused={isPaused}
                    sizeType={'normal'}
                    color={colors.musicBarText}
                    onPress={async () => {
                        if (isPaused) {
                            await TrackPlayer.play();
                        } else {
                            await TrackPlayer.pause();
                        }
                    }}
                />
            </CircularProgressBase>
        </Animated.View>
    );
}
function MusicBar() {
    const musicItem = TrackPlayer.useCurrentMusic();

    const [showKeyboard, setKeyboardStatus] = useState(false);

    const colors = useColors();
    const safeAreaInsets = useSafeAreaInsets();
    
    // 添加整体动画效果
    const slideUpAnimation = useSharedValue(100);
    const fadeAnimation = useSharedValue(0);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    
    // 当音乐项改变时的入场动画
    useEffect(() => {
        if (musicItem && !showKeyboard) {
            slideUpAnimation.value = withSpring(0, {
                damping: 20,
                stiffness: 300,
            });
            fadeAnimation.value = withSpring(1, {
                damping: 20,
                stiffness: 300,
            });
        } else {
            slideUpAnimation.value = withSpring(100, {
                damping: 20,
                stiffness: 300,
            });
            fadeAnimation.value = withSpring(0, {
                damping: 20,
                stiffness: 300,
            });
        }
    }, [musicItem, showKeyboard]);
    
    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: slideUpAnimation.value}],
            opacity: fadeAnimation.value,
        };
    });

    return (
        <>
            {musicItem && !showKeyboard && (
                <Animated.View
                    style={[
                        style.wrapper,
                        {
                            backgroundColor: colors.musicBar,
                            paddingRight: safeAreaInsets.right + rpx(24),
                        },
                        animatedStyle,
                    ]}
                    accessible
                    accessibilityLabel={`歌曲: ${musicItem.title} 歌手: ${musicItem.artist}`}
                    // onPress={() => {
                    //     navigate(ROUTE_PATH.MUSIC_DETAIL);
                    // }}
                >
                    <MusicInfo musicItem={musicItem} />
                    <View style={style.actionGroup}>
                        <CircularPlayBtn />
                        <Icon
                            accessible
                            accessibilityLabel="播放列表"
                            name="playlist"
                            size={rpx(56)}
                            onPress={() => {
                                showPanel('PlayList');
                            }}
                            color={colors.musicBarText}
                            style={[style.actionIcon]}
                        />
                    </View>
                </Animated.View>
            )}
        </>
    );
}

export default memo(MusicBar, () => true);

const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: rpx(132),
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: rpx(24),
    },
    actionGroup: {
        width: rpx(200),
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        marginLeft: rpx(36),
    },
});
