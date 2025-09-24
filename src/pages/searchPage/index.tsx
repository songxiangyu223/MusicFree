import React, {useEffect} from 'react';
import NavBar from './components/navBar';
import {useAtom, useSetAtom} from 'jotai';
import {
    initSearchResults,
    PageStatus,
    pageStatusAtom,
    queryAtom,
    searchResultsAtom,
} from './store/atoms';
import HistoryPanel from './components/historyPanel';
import ResultPanel from './components/resultPanel';
import {PageContainer, PageStatus as LayoutPageStatus} from '@/components/layout';

export default function () {
    const [pageStatus, setPageStatus] = useAtom(pageStatusAtom);
    const setQuery = useSetAtom(queryAtom);
    const setSearchResultsState = useSetAtom(searchResultsAtom);
    
    useEffect(() => {
        setSearchResultsState(initSearchResults);
        return () => {
            setPageStatus(PageStatus.EDITING);
            setQuery('');
        };
    }, []);

    // 将搜索页面状态映射到布局组件状态
    const getLayoutStatus = () => {
        switch (pageStatus) {
            case PageStatus.SEARCHING:
                return LayoutPageStatus.LOADING;
            case PageStatus.NO_PLUGIN:
                return LayoutPageStatus.NO_PLUGIN;
            case PageStatus.RESULT:
                return LayoutPageStatus.SUCCESS;
            case PageStatus.EDITING:
            default:
                return LayoutPageStatus.SUCCESS;
        }
    };

    const renderContent = () => {
        if (pageStatus === PageStatus.EDITING) {
            return <HistoryPanel />;
        }
        if (pageStatus === PageStatus.RESULT) {
            return <ResultPanel />;
        }
        return null;
    };

    return (
        <PageContainer 
            status={getLayoutStatus()}
            noPluginType="搜索"
        >
            <NavBar />
            {renderContent()}
        </PageContainer>
    );
}
