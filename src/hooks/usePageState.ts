import {useState, useCallback} from 'react';

export enum CommonPageStatus {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
    EMPTY = 'empty',
}

interface IUsePageStateOptions<T = any> {
    /** 初始状态 */
    initialStatus?: CommonPageStatus;
    /** 初始数据 */
    initialData?: T;
    /** 错误处理函数 */
    onError?: (error: any) => void;
    /** 成功处理函数 */
    onSuccess?: (data: T) => void;
}

interface IPageState<T = any> {
    /** 当前状态 */
    status: CommonPageStatus;
    /** 数据 */
    data: T | null;
    /** 错误信息 */
    error: any;
    /** 是否加载中 */
    loading: boolean;
}

interface IPageStateActions<T = any> {
    /** 设置加载状态 */
    setLoading: () => void;
    /** 设置成功状态 */
    setSuccess: (data: T) => void;
    /** 设置错误状态 */
    setError: (error: any) => void;
    /** 设置空状态 */
    setEmpty: () => void;
    /** 设置空闲状态 */
    setIdle: () => void;
    /** 重置状态 */
    reset: () => void;
    /** 执行异步操作 */
    execute: (asyncFn: () => Promise<T>) => Promise<void>;
}

/**
 * 通用页面状态管理Hook
 * 提供标准的加载、成功、错误、空状态管理
 */
export function usePageState<T = any>(
    options: IUsePageStateOptions<T> = {}
): [IPageState<T>, IPageStateActions<T>] {
    const {
        initialStatus = CommonPageStatus.IDLE,
        initialData = null,
        onError,
        onSuccess,
    } = options;

    const [status, setStatus] = useState<CommonPageStatus>(initialStatus);
    const [data, setData] = useState<T | null>(initialData);
    const [error, setErrorState] = useState<any>(null);

    const setLoading = useCallback(() => {
        setStatus(CommonPageStatus.LOADING);
        setErrorState(null);
    }, []);

    const setSuccess = useCallback((newData: T) => {
        setStatus(CommonPageStatus.SUCCESS);
        setData(newData);
        setErrorState(null);
        onSuccess?.(newData);
    }, [onSuccess]);

    const setError = useCallback((err: any) => {
        setStatus(CommonPageStatus.ERROR);
        setErrorState(err);
        onError?.(err);
    }, [onError]);

    const setEmpty = useCallback(() => {
        setStatus(CommonPageStatus.EMPTY);
        setData(null);
        setErrorState(null);
    }, []);

    const setIdle = useCallback(() => {
        setStatus(CommonPageStatus.IDLE);
        setErrorState(null);
    }, []);

    const reset = useCallback(() => {
        setStatus(initialStatus);
        setData(initialData);
        setErrorState(null);
    }, [initialStatus, initialData]);

    const execute = useCallback(async (asyncFn: () => Promise<T>) => {
        try {
            setLoading();
            const result = await asyncFn();
            if (result === null || result === undefined || 
                (Array.isArray(result) && result.length === 0)) {
                setEmpty();
            } else {
                setSuccess(result);
            }
        } catch (err) {
            setError(err);
        }
    }, [setLoading, setSuccess, setError, setEmpty]);

    const state: IPageState<T> = {
        status,
        data,
        error,
        loading: status === CommonPageStatus.LOADING,
    };

    const actions: IPageStateActions<T> = {
        setLoading,
        setSuccess,
        setError,
        setEmpty,
        setIdle,
        reset,
        execute,
    };

    return [state, actions];
}

export {CommonPageStatus as PageStatus};