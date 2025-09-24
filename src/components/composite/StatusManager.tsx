import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Loading from '@/components/base/loading';
import Empty from '@/components/base/empty';
import NoPlugin from '@/components/base/noPlugin';
import {PageStatus} from '../layout/PageContainer';

interface IStatusManagerProps {
    /** 当前状态 */
    status: PageStatus | string;
    /** 成功状态时显示的内容 */
    children?: ReactNode;
    /** 自定义加载组件 */
    loadingComponent?: ReactNode;
    /** 自定义空状态组件 */
    emptyComponent?: ReactNode;
    /** 自定义错误状态组件 */
    errorComponent?: ReactNode;
    /** 自定义无插件状态组件 */
    noPluginComponent?: ReactNode;
    /** 无插件状态的功能类型 */
    noPluginType?: string;
    /** 容器样式 */
    containerStyle?: StyleProp<ViewStyle>;
    /** 错误信息 */
    error?: any;
    /** 空状态提示文本 */
    emptyText?: string;
    /** 错误状态提示文本 */
    errorText?: string;
}

/**
 * 状态管理组件
 * 根据不同状态显示对应的内容
 */
export default function StatusManager(props: IStatusManagerProps) {
    const {
        status,
        children,
        loadingComponent,
        emptyComponent,
        errorComponent,
        noPluginComponent,
        noPluginType,
        containerStyle,
        error,
        emptyText,
        errorText,
    } = props;

    const renderContent = () => {
        switch (status) {
            case PageStatus.LOADING:
            case 'loading':
                return loadingComponent || <Loading />;
            
            case PageStatus.EMPTY:
            case 'empty':
                return emptyComponent || <Empty description={emptyText} />;
            
            case PageStatus.ERROR:
            case 'error':
                return errorComponent || <Empty description={errorText || error?.message || '加载失败'} />;
            
            case PageStatus.NO_PLUGIN:
            case 'no_plugin':
                return noPluginComponent || <NoPlugin notSupportType={noPluginType} />;
            
            case PageStatus.SUCCESS:
            case 'success':
            default:
                return children;
        }
    };

    return (
        <View style={[{flex: 1}, containerStyle]}>
            {renderContent()}
        </View>
    );
}