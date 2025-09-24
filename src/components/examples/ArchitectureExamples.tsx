/**
 * 架构组件使用示例
 * 
 * 这个文件展示了如何使用新的架构组件来快速构建页面
 */

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
    PageContainer,
    PageLayout,
    ScreenWrapper,
    PageStatus,
} from '@/components/layout';
import {
    StandardNavBar,
    SearchNavBar,
    HomeNavBar,
} from '@/components/navigation';
import {
    SearchInput,
    ActionMenu,
    StatusManager,
    IActionMenuItem,
} from '@/components/composite';
import {usePageState, useSearch} from '@/hooks';

// 示例1: 简单的列表页面
export function SimpleListPage() {
    const [state, actions] = usePageState();

    useEffect(() => {
        const loadData = async () => {
            await actions.execute(async () => {
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1000));
                return ['项目1', '项目2', '项目3'];
            });
        };
        loadData();
    }, []);

    const menuItems: IActionMenuItem[] = [
        {
            icon: 'plus',
            title: '添加',
            onPress: () => console.log('添加'),
        },
        {
            icon: 'refresh',
            title: '刷新',
            onPress: () => console.log('刷新'),
        },
    ];

    return (
        <PageLayout>
            <StandardNavBar
                title="列表页面"
                actionComponent={<ActionMenu items={menuItems} />}
            />
            <StatusManager status={state.status}>
                <View style={{flex: 1, padding: 20}}>
                    {state.data?.map((item: string, index: number) => (
                        <Text key={index}>{item}</Text>
                    ))}
                </View>
            </StatusManager>
        </PageLayout>
    );
}

// 示例2: 搜索页面
export function ExampleSearchPage() {
    const [searchState, searchActions, pageState] = useSearch({
        searchFn: async (query: string) => {
            // 模拟搜索API
            await new Promise(resolve => setTimeout(resolve, 500));
            return [`搜索结果: ${query}`, `相关: ${query}123`];
        },
        debounceDelay: 300,
        minSearchLength: 2,
    });

    return (
        <PageContainer 
            status={pageState.status}
            emptyText="没有找到相关内容"
        >
            <SearchNavBar
                value={searchState.query}
                onChangeText={searchActions.setQuery}
                onSubmit={() => searchActions.search()}
                placeholder="输入搜索关键词"
            />
            <View style={{flex: 1, padding: 20}}>
                {pageState.data?.map((item: string, index: number) => (
                    <Text key={index}>{item}</Text>
                ))}
            </View>
        </PageContainer>
    );
}

// 示例3: 主页面
export function ExampleHomePage() {
    return (
        <PageLayout>
            <HomeNavBar searchPlaceholder="搜索音乐、歌手、专辑" />
            <View style={{flex: 1, padding: 20}}>
                <Text>主页内容</Text>
            </View>
        </PageLayout>
    );
}

// 示例4: 设置页面
export function ExampleSettingsPage() {
    const menuItems: IActionMenuItem[] = [
        {
            icon: 'share',
            title: '分享',
            onPress: () => console.log('分享'),
        },
        {
            icon: 'info',
            title: '关于',
            onPress: () => console.log('关于'),
        },
    ];

    return (
        <ScreenWrapper useVerticalSafeArea>
            <StandardNavBar
                title="设置"
                withStatusBar
                menu={menuItems}
            />
            <View style={{flex: 1, padding: 20}}>
                <Text>设置内容</Text>
            </View>
        </ScreenWrapper>
    );
}

// 示例5: 搜索输入组件独立使用
export function ExampleSearchInput() {
    const [query, setQuery] = useState('');

    return (
        <View style={{padding: 20}}>
            <SearchInput
                value={query}
                onChangeText={setQuery}
                placeholder="搜索..."
                showClearButton
                showSearchIcon
                onSubmit={() => console.log('搜索:', query)}
            />
        </View>
    );
}

// 示例6: 状态管理器独立使用
export function ExampleStatusManager() {
    const [status, setStatus] = useState<PageStatus>(PageStatus.LOADING);

    useEffect(() => {
        // 模拟数据加载
        setTimeout(() => {
            setStatus(PageStatus.SUCCESS);
        }, 2000);
    }, []);

    return (
        <View style={{flex: 1}}>
            <StatusManager 
                status={status}
                emptyText="暂无数据"
                errorText="加载失败，请重试"
            >
                <View style={{padding: 20}}>
                    <Text>数据加载完成!</Text>
                </View>
            </StatusManager>
        </View>
    );
}