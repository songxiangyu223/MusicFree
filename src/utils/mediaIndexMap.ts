/**
 * 媒体索引映射工具
 * 用于创建和管理媒体项目的索引映射，支持根据平台和ID快速查找媒体项目的索引位置
 */

/**
 * 索引映射接口
 * 提供索引映射的基本操作方法
 */
export interface IIndexMap {
    /** 获取完整的索引映射对象 */
    getIndexMap: () => Record<string, Record<string, number>>;
    /** 根据媒体项目获取其在数组中的索引位置 */
    getIndex: (mediaItem: ICommon.IMediaBase) => number;
    /** 检查指定的媒体项目是否存在于映射中 */
    has: (mediaItem: ICommon.IMediaBase) => boolean;
}

/**
 * 创建媒体索引映射
 * 根据媒体项目数组创建一个索引映射，用于快速查找媒体项目的位置
 * 
 * @param mediaItems 媒体项目数组
 * @returns 返回包含索引映射操作方法的对象
 */
export function createMediaIndexMap(
    mediaItems: ICommon.IMediaBase[],
): IIndexMap {
    // 创建二级映射结构：平台 -> ID -> 索引位置
    const indexMap: Record<string, Record<string, number>> = {};

    // 遍历媒体项目数组，构建索引映射
    mediaItems.forEach((item, index) => {
        // 检查平台映射是否已存在
        if (!indexMap[item.platform]) {
            // 平台映射不存在，创建新的平台映射
            indexMap[item.platform] = {
                [item.id]: index,
            };
        } else {
            // 平台映射已存在，添加或更新该平台下的媒体项目索引
            indexMap[item.platform][item.id] = index;
        }
    });

    /**
     * 获取完整的索引映射对象
     * @returns 返回完整的索引映射
     */
    function getIndexMap() {
        return indexMap;
    }

    /**
     * 根据媒体项目获取其索引位置
     * @param mediaItem 媒体项目对象
     * @returns 返回媒体项目在数组中的索引位置，如果不存在则返回-1
     */
    function getIndex(mediaItem: ICommon.IMediaBase) {
        // 空值检查
        if (!mediaItem) {
            return -1;
        }
        // 使用可选链操作符安全地获取索引，不存在时返回-1
        return indexMap[mediaItem.platform]?.[mediaItem.id] ?? -1;
    }

    /**
     * 检查媒体项目是否存在于映射中
     * @param mediaItem 媒体项目对象
     * @returns 如果媒体项目存在于映射中返回true，否则返回false
     */
    function has(mediaItem: ICommon.IMediaBase) {
        // 空值检查
        if (!mediaItem) {
            return false;
        }

        // 检查映射中是否存在该媒体项目（索引大于-1表示存在）
        return indexMap[mediaItem.platform]?.[mediaItem.id] > -1;
    }

    // 返回索引映射操作对象
    return {
        getIndexMap,
        getIndex,
        has,
    };
}
