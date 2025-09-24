import React from 'react';
import {ColorKey, colorMap, iconSizeConst} from '@/constants/uiConst';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {StyleSheet, View, Pressable} from 'react-native';
import useColors from '@/hooks/useColors';
import {SvgProps} from 'react-native-svg';
import Icon, {IIconName} from '@/components/base/icon.tsx';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';

interface IIconButtonProps extends SvgProps {
    name: IIconName;
    style?: SvgProps['style'];
    sizeType?: keyof typeof iconSizeConst;
    fontColor?: ColorKey;
    color?: string;
    onPress?: () => void;
    accessibilityLabel?: string;
}
export function IconButtonWithGesture(props: IIconButtonProps) {
    const {
        name,
        sizeType: size = 'normal',
        fontColor = 'normal',
        onPress,
        style,
        accessibilityLabel,
    } = props;
    const colors = useColors();
    const textSize = iconSizeConst[size];
    const color = colors[colorMap[fontColor]];
    return (
        <TapGestureHandler onActivated={onPress}>
            <View>
                <Icon
                    accessible
                    accessibilityLabel={accessibilityLabel}
                    name={name}
                    color={color}
                    style={[{minWidth: textSize}, styles.textCenter, style]}
                    size={textSize}
                />
            </View>
        </TapGestureHandler>
    );
}

export default function IconButton(props: IIconButtonProps) {
    const {sizeType = 'normal', fontColor = 'normal', style, color, onPress} = props;
    const colors = useColors();
    const size = iconSizeConst[sizeType];
    
    // 添加动画相关的shared values
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    
    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: scale.value}],
            opacity: opacity.value,
        };
    });
    
    // 按下时的动画
    const handlePressIn = () => {
        scale.value = withSpring(0.95, {
            damping: 15,
            stiffness: 300,
        });
        opacity.value = withSpring(0.7, {
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
        opacity.value = withSpring(1, {
            damping: 15,
            stiffness: 300,
        });
    };

    if (onPress) {
        return (
            <Animated.View style={animatedStyle}>
                <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={onPress}
                    style={({pressed}) => [
                        {minWidth: size},
                        styles.textCenter,
                        style,
                    ]}
                    accessible={props.accessible}
                    accessibilityLabel={props.accessibilityLabel}
                    hitSlop={props.hitSlop}
                >
                    <Icon
                        name={props.name}
                        color={color ?? colors[colorMap[fontColor]]}
                        size={size}
                    />
                </Pressable>
            </Animated.View>
        );
    }

    return (
        <Icon
            {...props}
            color={color ?? colors[colorMap[fontColor]]}
            style={[{minWidth: size}, styles.textCenter, style]}
            size={size}
        />
    );
}

const styles = StyleSheet.create({
    textCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
