import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import PageLayout from './PageLayout';
import Loading from '@/components/base/loading';
import Empty from '@/components/base/empty';
import NoPlugin from '@/components/base/noPlugin';

export enum PageStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
    EMPTY = 'empty',
    NO_PLUGIN = 'no_plugin',
}

interface IPageContainerProps {
    /** 页面状态 */
    status: PageStatus;
    /** 页面内容 */
    children?: ReactNode;
    /** 加载组件 */
    loadingComponent?: ReactNode;
    /** 空状态组件 */
    emptyComponent?: ReactNode;
    /** 错误状态组件 */
    errorComponent?: ReactNode;
    /** 无插件状态组件 */
    noPluginComponent?: ReactNode;
    /** 无插件状态的功能类型 */
    noPluginType?: string;
    /** 是否显示状态栏 */
    showStatusBar?: boolean;
    /** 是否显示音乐播放条 */
    showMusicBar?: boolean;
    /** 容器样式 */
    containerStyle?: StyleProp<ViewStyle>;
    /** 内容区域样式 */
    contentStyle?: StyleProp<ViewStyle>;
}

/**
 * 带状态管理的页面容器组件
 * 统一处理加载、空状态、错误状态等场景
 */
export default function PageContainer(props: IPageContainerProps) {
    const {
        status,
        children,
        loadingComponent,
        emptyComponent,
        errorComponent,
        noPluginComponent,
        noPluginType,
        showStatusBar = true,
        showMusicBar = true,
        containerStyle,
        contentStyle,
    } = props;

    const renderContent = () => {
        switch (status) {
            case PageStatus.LOADING:
                return loadingComponent || <Loading />;
            
            case PageStatus.EMPTY:
                return emptyComponent || <Empty />;
            
            case PageStatus.ERROR:
                return errorComponent || <Empty />;
            
            case PageStatus.NO_PLUGIN:
                return noPluginComponent || <NoPlugin notSupportType={noPluginType} />;
            
            case PageStatus.SUCCESS:
            default:
                return children;
        }
    };

    return (
        <PageLayout
            showStatusBar={showStatusBar}
            showMusicBar={showMusicBar}
            containerStyle={containerStyle}
            contentStyle={contentStyle}
        >
            <View style={{flex: 1}}>
                {renderContent()}
            </View>
        </PageLayout>
    );
}

export {PageStatus};