# 前端架构组件库文档

## 概述

本文档介绍了优化后的前端架构组件库，这些组件旨在减少代码重复，提高开发效率，并提供一致的用户体验。

## 目录结构

```
src/components/
├── layout/                 # 布局组件
│   ├── PageLayout.tsx      # 页面布局组件
│   ├── ScreenWrapper.tsx   # 屏幕包装组件
│   └── PageContainer.tsx   # 带状态管理的页面容器
├── navigation/             # 导航组件
│   ├── StandardNavBar.tsx  # 标准导航栏
│   ├── SearchNavBar.tsx    # 搜索导航栏
│   └── HomeNavBar.tsx      # 主页导航栏
├── composite/              # 复合组件
│   ├── SearchInput.tsx     # 搜索输入框
│   ├── ActionMenu.tsx      # 操作菜单
│   └── StatusManager.tsx   # 状态管理器
└── hoc/                    # 高阶组件
    └── withNavigation.tsx  # 导航增强HOC

src/hooks/
├── usePageState.ts         # 页面状态管理Hook
└── useSearch.ts           # 搜索功能Hook
```

## 组件详细说明

### 1. 布局组件 (Layout Components)

#### PageLayout
通用页面布局组件，统一处理SafeAreaView、StatusBar、MusicBar等公共元素。

**用法：**
```tsx
import {PageLayout} from '@/components/layout';

function MyPage() {
    return (
        <PageLayout 
            showStatusBar={true}
            showMusicBar={true}
            statusBarBackgroundColor="transparent"
        >
            {/* 页面内容 */}
        </PageLayout>
    );
}
```

**Props：**
- `showStatusBar?: boolean` - 是否显示状态栏（默认true）
- `showMusicBar?: boolean` - 是否显示音乐播放条（默认true）
- `statusBarBackgroundColor?: string` - 状态栏背景色
- `statusBarStyle?: 'default' | 'light-content' | 'dark-content'` - 状态栏样式
- `containerStyle?: StyleProp<ViewStyle>` - 容器样式
- `contentStyle?: StyleProp<ViewStyle>` - 内容区域样式
- `safeAreaEdges?: Array<'top' | 'bottom' | 'left' | 'right'>` - SafeAreaView的边缘设置

#### PageContainer
带状态管理的页面容器组件，统一处理加载、空状态、错误状态等场景。

**用法：**
```tsx
import {PageContainer, PageStatus} from '@/components/layout';

function MyPage() {
    const [status, setStatus] = useState(PageStatus.LOADING);
    
    return (
        <PageContainer 
            status={status}
            noPluginType="搜索"
        >
            {/* 成功状态下的内容 */}
        </PageContainer>
    );
}
```

**Props：**
- `status: PageStatus | string` - 当前状态
- `loadingComponent?: ReactNode` - 自定义加载组件
- `emptyComponent?: ReactNode` - 自定义空状态组件
- `errorComponent?: ReactNode` - 自定义错误状态组件
- `noPluginComponent?: ReactNode` - 自定义无插件状态组件
- `noPluginType?: string` - 无插件状态的功能类型

#### ScreenWrapper
通用屏幕包装器组件，提供标准的屏幕容器和安全区域处理。

**用法：**
```tsx
import {ScreenWrapper} from '@/components/layout';

function MyPage() {
    return (
        <ScreenWrapper useVerticalSafeArea>
            {/* 页面内容 */}
        </ScreenWrapper>
    );
}
```

### 2. 导航组件 (Navigation Components)

#### StandardNavBar
标准导航栏组件，封装了AppBar的常用配置。

**用法：**
```tsx
import {StandardNavBar} from '@/components/navigation';

function MyPage() {
    return (
        <StandardNavBar
            title="页面标题"
            actions={[
                {
                    icon: 'magnifying-glass',
                    onPress: () => console.log('搜索'),
                }
            ]}
            menu={[
                {
                    icon: 'edit',
                    title: '编辑',
                    onPress: () => console.log('编辑'),
                }
            ]}
        />
    );
}
```

#### SearchNavBar
搜索导航栏组件，集成了搜索输入框和相关操作。

**用法：**
```tsx
import {SearchNavBar} from '@/components/navigation';

function SearchPage() {
    const [query, setQuery] = useState('');
    
    return (
        <SearchNavBar
            value={query}
            onChangeText={setQuery}
            onSubmit={() => performSearch(query)}
            placeholder="输入要搜索的内容"
            autoFocus
        />
    );
}
```

#### HomeNavBar
主页导航栏组件，包含菜单按钮和搜索框。

**用法：**
```tsx
import {HomeNavBar} from '@/components/navigation';

function HomePage() {
    return (
        <HomeNavBar 
            searchPlaceholder="点击这里开始搜索"
            onSearchPress={() => navigateToSearch()}
            onMenuPress={() => openDrawer()}
        />
    );
}
```

### 3. 复合组件 (Composite Components)

#### SearchInput
通用搜索输入组件，集成了搜索图标、清除按钮等常用功能。

**用法：**
```tsx
import {SearchInput} from '@/components/composite';

function MyComponent() {
    const [query, setQuery] = useState('');
    
    return (
        <SearchInput
            value={query}
            onChangeText={setQuery}
            onSubmit={() => performSearch()}
            placeholder="请输入搜索内容"
            showClearButton
            showSearchIcon
        />
    );
}
```

#### ActionMenu
操作菜单组件，提供可配置的下拉菜单功能。

**用法：**
```tsx
import {ActionMenu} from '@/components/composite';

function MyComponent() {
    const menuItems = [
        {
            icon: 'edit',
            title: '编辑',
            onPress: () => handleEdit(),
        },
        {
            icon: 'delete',
            title: '删除',
            onPress: () => handleDelete(),
        },
    ];
    
    return (
        <ActionMenu 
            items={menuItems}
            triggerIcon="ellipsis-vertical"
        />
    );
}
```

#### StatusManager
状态管理组件，根据不同状态显示对应的内容。

**用法：**
```tsx
import {StatusManager} from '@/components/composite';
import {PageStatus} from '@/components/layout';

function MyComponent() {
    const [status, setStatus] = useState(PageStatus.LOADING);
    
    return (
        <StatusManager 
            status={status}
            emptyText="暂无数据"
            errorText="加载失败"
        >
            {/* 成功状态下的内容 */}
        </StatusManager>
    );
}
```

### 4. 自定义Hooks

#### usePageState
通用页面状态管理Hook，提供标准的加载、成功、错误、空状态管理。

**用法：**
```tsx
import {usePageState, PageStatus} from '@/hooks/usePageState';

function MyComponent() {
    const [state, actions] = usePageState({
        initialStatus: PageStatus.IDLE,
        onError: (error) => console.error(error),
        onSuccess: (data) => console.log('成功:', data),
    });
    
    const loadData = async () => {
        await actions.execute(async () => {
            const result = await fetchData();
            return result;
        });
    };
    
    return (
        <div>
            {state.loading && <div>加载中...</div>}
            {state.data && <div>{JSON.stringify(state.data)}</div>}
            {state.error && <div>错误: {state.error.message}</div>}
        </div>
    );
}
```

#### useSearch
通用搜索Hook，提供搜索状态管理、防抖、分页等功能。

**用法：**
```tsx
import {useSearch} from '@/hooks/useSearch';

function SearchComponent() {
    const [searchState, searchActions, pageState] = useSearch({
        searchFn: async (query, page) => {
            return await searchAPI(query, page);
        },
        debounceDelay: 300,
        autoSearch: true,
        minSearchLength: 2,
    });
    
    return (
        <div>
            <input 
                value={searchState.query}
                onChange={(e) => searchActions.setQuery(e.target.value)}
            />
            {pageState.loading && <div>搜索中...</div>}
            {pageState.data && <div>搜索结果: {JSON.stringify(pageState.data)}</div>}
        </div>
    );
}
```

### 5. 高阶组件 (HOC)

#### withNavigation
导航增强高阶组件，为组件注入navigation属性。

**用法：**
```tsx
import {withNavigation, IWithNavigationProps} from '@/components/hoc';

interface IMyComponentProps extends IWithNavigationProps {
    title: string;
}

function MyComponent({navigation, title}: IMyComponentProps) {
    return (
        <button onClick={() => navigation.goBack()}>
            {title}
        </button>
    );
}

export default withNavigation(MyComponent);
```

## 迁移指南

### 从旧组件迁移到新组件

1. **页面布局迁移：**
```tsx
// 旧写法
<SafeAreaView edges={['top', 'bottom']} style={styles.container}>
    <StatusBar backgroundColor="transparent" />
    <HorizontalSafeAreaView style={globalStyle.flex1}>
        {/* 内容 */}
    </HorizontalSafeAreaView>
    <MusicBar />
</SafeAreaView>

// 新写法
<PageLayout>
    {/* 内容 */}
</PageLayout>
```

2. **导航栏迁移：**
```tsx
// 旧写法
<AppBar 
    withStatusBar
    actions={[{icon: 'search', onPress: handleSearch}]}
>
    页面标题
</AppBar>

// 新写法
<StandardNavBar
    title="页面标题"
    withStatusBar
    actions={[{icon: 'magnifying-glass', onPress: handleSearch}]}
/>
```

3. **搜索功能迁移：**
```tsx
// 旧写法
const [query, setQuery] = useState('');
const [loading, setLoading] = useState(false);
// 复杂的搜索逻辑...

// 新写法
const [searchState, searchActions, pageState] = useSearch({
    searchFn: performSearch,
    autoSearch: true,
});
```

## 最佳实践

1. **组件选择：**
   - 使用 `PageLayout` 作为标准页面容器
   - 使用 `PageContainer` 处理有状态的页面
   - 根据导航需求选择合适的导航栏组件

2. **状态管理：**
   - 使用 `usePageState` 管理页面加载状态
   - 使用 `useSearch` 处理搜索相关功能
   - 避免重复的状态管理逻辑

3. **样式规范：**
   - 通过 props 传递样式定制
   - 保持组件的一致性和可复用性
   - 使用主题系统进行颜色管理

4. **性能优化：**
   - 合理使用防抖功能
   - 避免不必要的重渲染
   - 使用 memo 优化组件性能

## 兼容性说明

- 所有新组件都基于现有的基础组件构建，保持向后兼容
- 可以逐步迁移，新旧组件可以共存
- 建议新功能使用新组件库，旧功能逐步重构