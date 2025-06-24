/**
 * 媒体扩展信息管理模块
 * 用于管理媒体项目的元数据信息，包括获取、设置、更新和删除操作
 * 数据存储基于 MMKV，按插件平台进行分组存储
 */

import getOrCreateMMKV from '@/utils/getOrCreateMMKV';
import safeParse from '@/utils/safeParse';

/**
 * 内部方法：获取指定插件的存储实例
 * @param pluginName 插件名称，用于标识不同的插件平台
 * @returns MMKV 存储实例
 */
const getPluginStore = (pluginName: string) => {
    return getOrCreateMMKV(`MediaExtra.${pluginName}`);
};

/**
 * 获取媒体项目的元数据信息
 * @param mediaItem 媒体项目基础信息，必须包含 platform 和 id
 * @returns 返回解析后的媒体元数据，如果不存在则返回 null
 */
const get = (mediaItem: ICommon.IMediaBase) => {
    // 检查媒体项目是否包含必要的平台和 ID 信息
    if (mediaItem.platform && mediaItem.id) {
        // 从对应平台的存储中获取元数据字符串
        const meta = getPluginStore(mediaItem.platform).getString(
            `${mediaItem.id}`,
        );
        
        // 如果没有找到数据，返回 null
        if (!meta) {
            return null;
        }

        // 安全解析 JSON 字符串为媒体元数据对象
        return safeParse<ICommon.IMediaMeta>(meta);
    }

    return null;
};

/**
 * 设置媒体项目的元数据信息
 * @param mediaItem 媒体项目基础信息，必须包含 platform 和 id
 * @param meta 要设置的媒体元数据
 * @returns 设置成功返回 true，否则返回 false
 */
const set = (mediaItem: ICommon.IMediaBase, meta: ICommon.IMediaMeta) => {
    // 检查媒体项目是否包含必要的平台和 ID 信息
    if (mediaItem.platform && mediaItem.id) {
        // 获取对应平台的存储实例
        const store = getPluginStore(mediaItem.platform);
        // 将元数据对象序列化为 JSON 字符串并存储
        store.set(mediaItem.id, JSON.stringify(meta));
        return true;
    }

    return false;
};

/**
 * 更新媒体项目的元数据信息（部分更新）
 * @param mediaItem 媒体项目基础信息，必须包含 platform 和 id
 * @param meta 要更新的元数据字段（部分字段）
 * @returns 更新成功返回 true，否则返回 false
 */
const update = (
    mediaItem: ICommon.IMediaBase,
    meta: Partial<ICommon.IMediaMeta>,
) => {
    // 检查媒体项目是否包含必要的平台和 ID 信息
    if (mediaItem.platform && mediaItem.id) {
        // 获取对应平台的存储实例
        const store = getPluginStore(mediaItem.platform);
        // 获取现有的元数据
        const originalMeta = get(mediaItem);

        // 合并原有数据和新数据，然后存储
        store.set(
            `${mediaItem.id}`,
            JSON.stringify({
                ...(originalMeta || {}), // 保留原有数据，如果没有则使用空对象
                ...meta, // 新数据会覆盖原有的同名字段
            }),
        );
        return true;
    }

    return false;
};

/**
 * 删除指定媒体项目的元数据信息
 * @param mediaItem 媒体项目基础信息，必须包含 platform 和 id
 * @returns 删除成功返回 true，否则返回 false
 */
const remove = (mediaItem: ICommon.IMediaBase) => {
    // 检查媒体项目是否包含必要的平台和 ID 信息
    if (mediaItem.platform && mediaItem.id) {
        // 获取对应平台的存储实例
        const store = getPluginStore(mediaItem.platform);
        // 删除指定 ID 的数据
        store.delete(`${mediaItem.id}`);
        return true;
    }

    return false;
};

/**
 * 清空指定插件的所有元数据信息
 * @param pluginName 插件名称，用于标识要清空的插件平台
 */
const removeAll = (pluginName: string) => {
    // 获取指定插件的存储实例
    const store = getPluginStore(pluginName);
    // 清空该插件的所有数据
    store.clearAll();
};

// 导出媒体扩展信息管理对象，提供完整的 CRUD 操作接口
const MediaExtra = {
    get: get,          // 获取元数据
    set: set,          // 设置元数据
    update: update,    // 更新元数据
    remove: remove,    // 删除元数据
    removeAll: removeAll, // 清空插件数据
};

export default MediaExtra;
