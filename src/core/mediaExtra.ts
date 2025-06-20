/**
 * 媒体扩展信息管理模块
 * 提供媒体元数据的增删改查功能
 * 使用MMKV存储，按插件名称分组存储
 */

import getOrCreateMMKV from '@/utils/getOrCreateMMKV';
import safeParse from '@/utils/safeParse';

/**
 * 内部方法：获取插件专用的存储实例
 * @param pluginName 插件名称
 * @returns MMKV存储实例
 */
const getPluginStore = (pluginName: string) => {
    return getOrCreateMMKV(`MediaExtra.${pluginName}`);
};

/** 
 * 获取媒体项的元数据信息
 * @param mediaItem 媒体项基础信息
 * @returns 媒体元数据或null
 */
const get = (mediaItem: ICommon.IMediaBase) => {
    // 检查媒体项是否包含必要的平台和ID信息
    if (mediaItem.platform && mediaItem.id) {
        // 从对应平台的存储中获取元数据
        const meta = getPluginStore(mediaItem.platform).getString(
            `${mediaItem.id}`,
        );
        if (!meta) {
            return null;
        }

        // 安全解析JSON字符串为元数据对象
        return safeParse<ICommon.IMediaMeta>(meta);
    }

    return null;
};

/** 
 * 设置媒体项的元数据信息
 * @param mediaItem 媒体项基础信息
 * @param meta 要设置的元数据
 * @returns 操作是否成功
 */
const set = (mediaItem: ICommon.IMediaBase, meta: ICommon.IMediaMeta) => {
    // 检查媒体项是否包含必要的平台和ID信息
    if (mediaItem.platform && mediaItem.id) {
        const store = getPluginStore(mediaItem.platform);
        // 将元数据序列化为JSON字符串并存储
        store.set(mediaItem.id, JSON.stringify(meta));
        return true;
    }

    return false;
};

/** 
 * 更新媒体项的元数据信息（部分更新）
 * @param mediaItem 媒体项基础信息
 * @param meta 要更新的元数据字段
 * @returns 操作是否成功
 */
const update = (
    mediaItem: ICommon.IMediaBase,
    meta: Partial<ICommon.IMediaMeta>,
) => {
    // 检查媒体项是否包含必要的平台和ID信息
    if (mediaItem.platform && mediaItem.id) {
        const store = getPluginStore(mediaItem.platform);
        // 获取现有的元数据
        const originalMeta = get(mediaItem);

        // 合并原有数据和新数据，然后存储
        store.set(
            `${mediaItem.id}`,
            JSON.stringify({
                ...(originalMeta || {}),
                ...meta,
            }),
        );
        return true;
    }

    return false;
};

/** 
 * 删除媒体项的元数据信息
 * @param mediaItem 媒体项基础信息
 * @returns 操作是否成功
 */
const remove = (mediaItem: ICommon.IMediaBase) => {
    // 检查媒体项是否包含必要的平台和ID信息
    if (mediaItem.platform && mediaItem.id) {
        const store = getPluginStore(mediaItem.platform);
        // 从存储中删除对应的元数据
        store.delete(`${mediaItem.id}`);
        return true;
    }

    return false;
};

/**
 * 删除指定插件的所有元数据信息
 * @param pluginName 插件名称
 */
const removeAll = (pluginName: string) => {
    const store = getPluginStore(pluginName);
    // 清空该插件的所有存储数据
    store.clearAll();
};

// 导出媒体扩展信息管理对象
const MediaExtra = {
    get: get,
    set: set,
    update: update,
    remove: remove,
    removeAll: removeAll,
};

export default MediaExtra;
