import React, {ComponentType} from 'react';
import {useNavigation} from '@react-navigation/native';

export interface IWithNavigationProps {
    navigation: any;
}

/**
 * 导航增强高阶组件
 * 为组件注入navigation属性
 */
export function withNavigation<P extends object>(
    WrappedComponent: ComponentType<P & IWithNavigationProps>
) {
    const WithNavigationComponent = (props: P) => {
        const navigation = useNavigation();
        
        return (
            <WrappedComponent
                {...props}
                navigation={navigation}
            />
        );
    };

    WithNavigationComponent.displayName = `withNavigation(${WrappedComponent.displayName || WrappedComponent.name})`;
    
    return WithNavigationComponent;
}