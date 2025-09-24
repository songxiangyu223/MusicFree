import {useState, useCallback, useRef, useEffect} from 'react';
import {usePageState, PageStatus} from './usePageState';

interface IUseSearchOptions<T = any> {
    /** 搜索函数 */
    searchFn: (query: string, page?: number) => Promise<T>;
    /** 防抖延迟时间(ms) */
    debounceDelay?: number;
    /** 最小搜索字符数 */
    minSearchLength?: number;
    /** 是否自动搜索 */
    autoSearch?: boolean;
    /** 每页数据量 */
    pageSize?: number;
    /** 搜索成功回调 */
    onSearchSuccess?: (data: T, query: string) => void;
    /** 搜索错误回调 */
    onSearchError?: (error: any, query: string) => void;
}

interface ISearchState<T = any> {
    /** 搜索关键词 */
    query: string;
    /** 当前页码 */
    currentPage: number;
    /** 是否有更多数据 */
    hasMore: boolean;
    /** 搜索历史 */
    history: string[];
}

interface ISearchActions<T = any> {
    /** 设置搜索关键词 */
    setQuery: (query: string) => void;
    /** 执行搜索 */
    search: (query?: string, page?: number) => Promise<void>;
    /** 加载更多 */
    loadMore: () => Promise<void>;
    /** 清空搜索 */
    clear: () => void;
    /** 重置搜索 */
    reset: () => void;
    /** 添加到历史记录 */
    addToHistory: (query: string) => void;
    /** 清空历史记录 */
    clearHistory: () => void;
}

/**
 * 通用搜索Hook
 * 提供搜索状态管理、防抖、分页等功能
 */
export function useSearch<T = any>(
    options: IUseSearchOptions<T>
): [
    ISearchState<T>,
    ISearchActions<T>,
    {
        status: PageStatus;
        data: T | null;
        error: any;
        loading: boolean;
    }
] {
    const {
        searchFn,
        debounceDelay = 300,
        minSearchLength = 1,
        autoSearch = false,
        pageSize = 20,
        onSearchSuccess,
        onSearchError,
    } = options;

    const [pageState, pageActions] = usePageState<T>();
    
    const [query, setQueryState] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [history, setHistory] = useState<string[]>([]);
    
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const setQuery = useCallback((newQuery: string) => {
        setQueryState(newQuery);
        
        // 自动搜索
        if (autoSearch && newQuery.length >= minSearchLength) {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            
            debounceTimerRef.current = setTimeout(() => {
                search(newQuery, 1);
            }, debounceDelay);
        } else if (newQuery.length < minSearchLength) {
            pageActions.setIdle();
        }
    }, [autoSearch, minSearchLength, debounceDelay, pageActions]);

    const search = useCallback(async (searchQuery?: string, page = 1) => {
        const queryToSearch = searchQuery ?? query;
        
        if (queryToSearch.length < minSearchLength) {
            return;
        }

        try {
            pageActions.setLoading();
            setCurrentPage(page);
            
            const result = await searchFn(queryToSearch, page);
            
            if (result === null || result === undefined || 
                (Array.isArray(result) && result.length === 0)) {
                pageActions.setEmpty();
                setHasMore(false);
            } else {
                pageActions.setSuccess(result);
                // 判断是否还有更多数据（这里需要根据具体的返回结构调整）
                if (Array.isArray(result)) {
                    setHasMore(result.length >= pageSize);
                } else {
                    setHasMore(false);
                }
            }
            
            onSearchSuccess?.(result, queryToSearch);
        } catch (error) {
            pageActions.setError(error);
            onSearchError?.(error, queryToSearch);
        }
    }, [query, minSearchLength, pageActions, searchFn, pageSize, onSearchSuccess, onSearchError]);

    const loadMore = useCallback(async () => {
        if (!hasMore || pageState.loading || !query) {
            return;
        }

        const nextPage = currentPage + 1;
        await search(query, nextPage);
    }, [hasMore, pageState.loading, query, currentPage, search]);

    const clear = useCallback(() => {
        setQueryState('');
        pageActions.reset();
        setCurrentPage(1);
        setHasMore(true);
        
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
    }, [pageActions]);

    const reset = useCallback(() => {
        clear();
        setHistory([]);
    }, [clear]);

    const addToHistory = useCallback((searchQuery: string) => {
        if (searchQuery.trim() && !history.includes(searchQuery)) {
            setHistory(prev => [searchQuery, ...prev.slice(0, 9)]); // 保留最近10条记录
        }
    }, [history]);

    const clearHistory = useCallback(() => {
        setHistory([]);
    }, []);

    // 清理定时器
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    const searchState: ISearchState<T> = {
        query,
        currentPage,
        hasMore,
        history,
    };

    const searchActions: ISearchActions<T> = {
        setQuery,
        search,
        loadMore,
        clear,
        reset,
        addToHistory,
        clearHistory,
    };

    return [searchState, searchActions, pageState];
}