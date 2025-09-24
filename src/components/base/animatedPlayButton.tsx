import React, {useEffect} from 'react';
import {ColorKey, colorMap, iconSizeConst} from '@/constants/uiConst';
import {StyleSheet, View} from 'react-native';
import useColors from '@/hooks/useColors';
import {SvgProps} from 'react-native-svg';
import Icon, {IIconName} from '@/components/base/icon.tsx';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    interpolate,
} from 'react-native-reanimated';

interface IAnimatedPlayButtonProps extends SvgProps {
    /** 当前是否为暂停状态 */
    isPaused: boolean;
    /** 按钮大小类型 */
    sizeType?: keyof typeof iconSizeConst;
    /** 字体颜色 */
    fontColor?: ColorKey;
    /** 自定义颜色 */
    color?: string;
    /** 点击事件 */
    onPress?: () => void;
    /** 无障碍标签 */
    accessibilityLabel?: string;
    /** 样式 */
    style?: SvgProps['style'];
}

export default function AnimatedPlayButton(props: IAnimatedPlayButtonProps) {
    const {
        isPaused,
        sizeType = 'normal',
        fontColor = 'normal',
        style,
        color,
        onPress,
        accessibilityLabel,
    } = props;
    
    const colors = useColors();
    const size = iconSizeConst[sizeType];
    
    // 动画相关的shared values
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);
    const iconOpacity = useSharedValue(1);
    const morphAnimation = useSharedValue(0);
    
    // 播放状态变化时的动画
    useEffect(() => {
        // 图标切换动画
        iconOpacity.value = withSequence(
            withTiming(0, {duration: 150}),
            withTiming(1, {duration: 150})
        );
        
        // 旋转动画
        rotation.value = withSequence(
            withSpring(180, {damping: 15, stiffness: 300}),
            withSpring(360, {damping: 15, stiffness: 300}),
            withTiming(0, {duration: 0})
        );
        
        // 形变动画（模拟播放和暂停图标之间的过渡）
        morphAnimation.value = withSpring(isPaused ? 0 : 1, {
            damping: 15,
            stiffness: 300,
        });
    }, [isPaused]);
    
    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: scale.value},
                {rotate: `${rotation.value}deg`}
            ],
            opacity: iconOpacity.value,
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
            <Icon
                name={isPaused ? 'play' : 'pause'}
                color={color ?? colors[colorMap[fontColor]]}
                style={[{minWidth: size}, styles.iconCenter, style]}
                size={size}
                onPress={onPress}
                accessible
                accessibilityLabel={accessibilityLabel}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    iconCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});