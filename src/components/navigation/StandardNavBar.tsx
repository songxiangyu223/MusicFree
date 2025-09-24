import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import AppBar from '@/components/base/appBar';
import {IIconName} from '@/components/base/icon';

interface IStandardNavBarProps {
    /** 标题 */
    title?: string | ReactNode;
    /** 标题文字透明度 */
    titleTextOpacity?: number;
    /** 是否显示状态栏 */
    withStatusBar?: boolean;
    /** 颜色 */
    color?: string;
    /** 右侧操作按钮 */
    actions?: Array<{
        icon: IIconName;
        onPress?: () => void;
    }>;
    /** 菜单项 */
    menu?: Array<{
        icon: IIconName;
        title: string;
        show?: boolean;
        onPress?: () => void;
    }>;
    /** 菜单是否包含状态栏 */
    menuWithStatusBar?: boolean;
    /** 容器样式 */
    containerStyle?: StyleProp<ViewStyle>;
    /** 内容样式 */
    contentStyle?: StyleProp<ViewStyle>;
    /** 自定义操作组件 */
    actionComponent?: ReactNode;
    /** 返回按钮点击事件 */
    onBackPress?: () => void;
}

/**
 * 标准导航栏组件
 * 封装了AppBar的常用配置
 */
export default function StandardNavBar(props: IStandardNavBarProps) {
    const {
        title,
        titleTextOpacity,
        withStatusBar = true,
        color,
        actions = [],
        menu = [],
        menuWithStatusBar = true,
        containerStyle,
        contentStyle,
        actionComponent,
        onBackPress,
    } = props;

    return (
        <AppBar
            titleTextOpacity={titleTextOpacity}
            withStatusBar={withStatusBar}
            color={color}
            actions={actions}
            menu={menu}
            menuWithStatusBar={menuWithStatusBar}
            containerStyle={containerStyle}
            contentStyle={contentStyle}
            actionComponent={actionComponent}
            onBackPress={onBackPress}
        >
            {title}
        </AppBar>
    );
}