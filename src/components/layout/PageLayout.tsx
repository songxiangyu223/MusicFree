import React, {ReactNode} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import StatusBar from '@/components/base/statusBar';
import MusicBar from '@/components/musicBar';
import HorizontalSafeAreaView from '@/components/base/horizontalSafeAreaView';
import globalStyle from '@/constants/globalStyle';
import Theme from '@/core/theme';

interface IPageLayoutProps {
    /** 页面内容 */
    children: ReactNode;
    /** 是否显示状态栏 */
    showStatusBar?: boolean;
    /** 是否显示音乐播放条 */
    showMusicBar?: boolean;
    /** 状态栏背景色 */
    statusBarBackgroundColor?: string;
    /** 状态栏样式 */
    statusBarStyle?: 'default' | 'light-content' | 'dark-content';
    /** 容器样式 */
    containerStyle?: StyleProp<ViewStyle>;
    /** 内容区域样式 */
    contentStyle?: StyleProp<ViewStyle>;
    /** SafeAreaView的边缘设置 */
    safeAreaEdges?: Array<'top' | 'bottom' | 'left' | 'right'>;
}

/**
 * 通用页面布局组件
 * 统一处理SafeAreaView、StatusBar、MusicBar等公共元素
 */
export default function PageLayout(props: IPageLayoutProps) {
    const {
        children,
        showStatusBar = true,
        showMusicBar = true,
        statusBarBackgroundColor = 'transparent',
        statusBarStyle,
        containerStyle,
        contentStyle,
        safeAreaEdges = ['top', 'bottom'],
    } = props;

    const theme = Theme.useTheme();

    const defaultStatusBarStyle = statusBarStyle ?? (theme.dark ? undefined : 'dark-content');

    return (
        <SafeAreaView 
            edges={safeAreaEdges} 
            style={[styles.container, containerStyle]}
        >
            {showStatusBar && (
                <StatusBar
                    backgroundColor={statusBarBackgroundColor}
                    barStyle={defaultStatusBarStyle}
                />
            )}
            <HorizontalSafeAreaView style={[globalStyle.flex1, contentStyle]}>
                {children}
            </HorizontalSafeAreaView>
            {showMusicBar && <MusicBar />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});