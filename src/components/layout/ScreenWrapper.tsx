import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import VerticalSafeAreaView from '@/components/base/verticalSafeAreaView';
import globalStyle from '@/constants/globalStyle';

interface IScreenWrapperProps {
    /** 子组件 */
    children: ReactNode;
    /** 容器样式 */
    style?: StyleProp<ViewStyle>;
    /** 是否使用垂直SafeAreaView */
    useVerticalSafeArea?: boolean;
    /** SafeAreaView的边缘设置 */
    edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
}

/**
 * 通用屏幕包装器组件
 * 提供标准的屏幕容器和安全区域处理
 */
export default function ScreenWrapper(props: IScreenWrapperProps) {
    const {
        children,
        style,
        useVerticalSafeArea = false,
        edges = ['top', 'bottom', 'left', 'right'],
    } = props;

    if (useVerticalSafeArea) {
        return (
            <VerticalSafeAreaView style={[globalStyle.fwflex1, style]}>
                {children}
            </VerticalSafeAreaView>
        );
    }

    return (
        <SafeAreaView 
            edges={edges} 
            style={[styles.wrapper, style]}
        >
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flex: 1,
    },
});