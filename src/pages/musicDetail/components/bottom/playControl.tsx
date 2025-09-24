import React, {useEffect} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import rpx from '@/utils/rpx';
import repeatModeConst from '@/constants/repeatModeConst';

import useOrientation from '@/hooks/useOrientation';
import {showPanel} from '@/components/panels/usePanel';
import TrackPlayer from '@/core/trackPlayer';
import {musicIsPaused} from '@/utils/trackUtils';
import Icon from '@/components/base/icon.tsx';
import AnimatedPlayButton from '@/components/base/animatedPlayButton';
import sleep from '@/utils/sleep.ts';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

export default function () {
    const repeatMode = TrackPlayer.useRepeatMode();
    const musicState = TrackPlayer.useMusicState();

    const orientation = useOrientation();
    const isPaused = musicIsPaused(musicState);
    
    // 中央播放按钮的动画
    const playButtonScale = useSharedValue(1);
    const playButtonRotation = useSharedValue(0);
    const playButtonGlow = useSharedValue(0);
    
    // 其他按钮的动画
    const sideButtonsOpacity = useSharedValue(1);
    
    // 播放状态变化时的动画效果
    useEffect(() => {
        // 播放按钮旋转动画
        playButtonRotation.value = withSequence(
            withTiming(360, {duration: 300}),
            withTiming(0, {duration: 0})
        );
        
        // 发光效果（播放时）
        if (!isPaused) {
            playButtonGlow.value = withSequence(
                withSpring(1, {damping: 15}),
                withSpring(0, {damping: 15})
            );
            
            // 周期性脉冲动画
            const interval = setInterval(() => {
                playButtonScale.value = withSequence(
                    withSpring(1.05, {damping: 15}),
                    withSpring(1, {damping: 15})
                );
            }, 3000);
            
            return () => clearInterval(interval);
        } else {
            playButtonGlow.value = withSpring(0, {damping: 15});
        }
    }, [isPaused]);
    
    // 播放按钮动画样式
    const playButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: playButtonScale.value},
                {rotate: `${playButtonRotation.value}deg`}
            ],
            shadowOpacity: playButtonGlow.value * 0.3,
            shadowRadius: playButtonGlow.value * 10,
            shadowColor: 'white',
            elevation: playButtonGlow.value * 10,
        };
    });
    
    // 侧边按钮动画样式
    const sideButtonsAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: sideButtonsOpacity.value,
        };
    });

    return (
        <>
            <View
                style={[
                    style.wrapper,
                    orientation === 'horizontal'
                        ? {
                              marginTop: 0,
                          }
                        : null,
                ]}>
                <Animated.View style={sideButtonsAnimatedStyle}>
                    <Icon
                        color={'white'}
                        name={repeatModeConst[repeatMode].icon}
                        size={rpx(56)}
                        onPress={async () => {
                            InteractionManager.runAfterInteractions(async () => {
                                await sleep(20);
                                TrackPlayer.toggleRepeatMode();
                            });
                        }}
                    />
                </Animated.View>
                
                <Animated.View style={sideButtonsAnimatedStyle}>
                    <Icon
                        color={'white'}
                        name={'skip-left'}
                        size={rpx(56)}
                        onPress={() => {
                            TrackPlayer.skipToPrevious();
                        }}
                    />
                </Animated.View>
                
                <Animated.View style={playButtonAnimatedStyle}>
                    <AnimatedPlayButton
                        isPaused={isPaused}
                        color={'white'}
                        sizeType={'normal'}
                        style={{width: rpx(96), height: rpx(96)}}
                        onPress={() => {
                            if (isPaused) {
                                TrackPlayer.play();
                            } else {
                                TrackPlayer.pause();
                            }
                        }}
                    />
                </Animated.View>
                
                <Animated.View style={sideButtonsAnimatedStyle}>
                    <Icon
                        color={'white'}
                        name={'skip-right'}
                        size={rpx(56)}
                        onPress={() => {
                            TrackPlayer.skipToNext();
                        }}
                    />
                </Animated.View>
                
                <Animated.View style={sideButtonsAnimatedStyle}>
                    <Icon
                        color={'white'}
                        name={'playlist'}
                        size={rpx(56)}
                        onPress={() => {
                            showPanel('PlayList');
                        }}
                    />
                </Animated.View>
            </View>
        </>
    );
}

const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: rpx(36),
        height: rpx(100),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
