import React, {useState} from 'react';
import {
    LayoutRectangle,
    StatusBar as OriginalStatusBar,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import rpx from '@/utils/rpx';
import useColors from '@/hooks/useColors';
import IconButton from '@/components/base/iconButton';
import Portal from '@/components/base/portal';
import ListItem from '@/components/base/listItem';
import {IIconName} from '@/components/base/icon';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export interface IActionMenuItem {
    icon: IIconName;
    title: string;
    show?: boolean;
    onPress?: () => void;
}

interface IActionMenuProps {
    /** 菜单项 */
    items: IActionMenuItem[];
    /** 触发按钮图标 */
    triggerIcon?: IIconName;
    /** 触发按钮颜色 */
    triggerColor?: string;
    /** 触发按钮样式 */
    triggerStyle?: StyleProp<ViewStyle>;
    /** 菜单是否包含状态栏高度 */
    includeStatusBar?: boolean;
    /** 菜单容器样式 */
    menuStyle?: StyleProp<ViewStyle>;
    /** 菜单项点击后是否自动关闭 */
    autoClose?: boolean;
}

const ANIMATION_EASING: Animated.EasingFunction = Easing.out(Easing.exp);
const ANIMATION_DURATION = 300;

const timingConfig = {
    duration: ANIMATION_DURATION,
    easing: ANIMATION_EASING,
};

/**
 * 操作菜单组件
 * 提供可配置的下拉菜单功能
 */
export default function ActionMenu(props: IActionMenuProps) {
    const {
        items = [],
        triggerIcon = 'ellipsis-vertical',
        triggerColor,
        triggerStyle,
        includeStatusBar = true,
        menuStyle,
        autoClose = true,
    } = props;

    const colors = useColors();
    const [showMenu, setShowMenu] = useState(false);
    const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
    const scaleRate = useSharedValue(0);

    const visibleItems = items.filter(item => item.show !== false);

    React.useEffect(() => {
        if (showMenu) {
            scaleRate.value = withTiming(1, timingConfig);
        } else {
            scaleRate.value = withTiming(0, timingConfig);
        }
    }, [showMenu]);

    const transformStyle = useAnimatedStyle(() => {
        return {
            opacity: scaleRate.value,
            transform: [{scale: scaleRate.value}],
        };
    });

    const handleTriggerPress = () => {
        setShowMenu(true);
    };

    const handleItemPress = (item: IActionMenuItem) => {
        if (autoClose) {
            setShowMenu(false);
        }
        // 延迟执行确保动画完成
        setTimeout(() => {
            item.onPress?.();
        }, autoClose ? 50 : 0);
    };

    const handleBackdropPress = () => {
        setShowMenu(false);
    };

    if (visibleItems.length === 0) {
        return null;
    }

    return (
        <>
            <IconButton
                name={triggerIcon}
                sizeType="normal"
                onLayout={evt => {
                    setTriggerLayout(evt.nativeEvent.layout);
                }}
                color={triggerColor || colors.text}
                style={triggerStyle}
                onPress={handleTriggerPress}
            />
            
            <Portal>
                {showMenu && (
                    <TouchableWithoutFeedback onPress={handleBackdropPress}>
                        <View style={styles.backdrop} />
                    </TouchableWithoutFeedback>
                )}
                
                {/* 菜单箭头 */}
                <Animated.View
                    pointerEvents={showMenu ? 'auto' : 'none'}
                    style={[
                        {
                            borderBottomColor: colors.background,
                            left:
                                (triggerLayout?.x ?? 0) +
                                (triggerLayout?.width ?? 0) / 2 -
                                rpx(10),
                            top:
                                (triggerLayout?.y ?? 0) +
                                (triggerLayout?.height ?? 0) +
                                (includeStatusBar
                                    ? OriginalStatusBar.currentHeight ?? 0
                                    : 0),
                        },
                        transformStyle,
                        styles.menuArrow,
                    ]}
                />
                
                {/* 菜单内容 */}
                <Animated.View
                    pointerEvents={showMenu ? 'auto' : 'none'}
                    style={[
                        {
                            backgroundColor: colors.background,
                            right: rpx(24),
                            top:
                                (triggerLayout?.y ?? 0) +
                                (triggerLayout?.height ?? 0) +
                                rpx(20) +
                                (includeStatusBar
                                    ? OriginalStatusBar.currentHeight ?? 0
                                    : 0),
                            shadowColor: colors.shadow,
                        },
                        transformStyle,
                        styles.menu,
                        menuStyle,
                    ]}
                >
                    {visibleItems.map(item => (
                        <ListItem
                            key={item.title}
                            withHorizontalPadding
                            heightType="small"
                            onPress={() => handleItemPress(item)}
                        >
                            <ListItem.ListItemIcon icon={item.icon} />
                            <ListItem.Content title={item.title} />
                        </ListItem>
                    ))}
                </Animated.View>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10010,
    },
    menuArrow: {
        position: 'absolute',
        borderColor: 'transparent',
        borderWidth: rpx(10),
        zIndex: 10012,
        transformOrigin: 'right top',
    },
    menu: {
        width: rpx(340),
        maxHeight: rpx(600),
        borderRadius: rpx(8),
        zIndex: 10011,
        position: 'absolute',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});