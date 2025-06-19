import pathConst from '@/constants/pathConst';
import {MMKV} from 'react-native-mmkv';

// 内部方法
const storageMap: Record<string, MMKV> = {};

// @ts-ignore;
global.mmkv = storageMap;

// Internal Method
const getOrCreateMMKV = (dbName: string, cachePath = false) => {
    if (storageMap[dbName]) {
        return storageMap[dbName];
    }

    const newStore = new MMKV({
        id: dbName,
        path: cachePath ? pathConst.mmkvCachePath : pathConst.mmkvPath,
    });

    storageMap[dbName] = newStore;
    return newStore;
};

export default getOrCreateMMKV;
