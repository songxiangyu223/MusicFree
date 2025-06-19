/**
 * 媒体项目工具类
 * 提供媒体项目的创建、解析、比较、合并等核心功能
 * @author 音乐播放器
 */

import {
    internalSerializeKey,
    localPluginPlatform,
    sortIndexSymbol,
    timeStampSymbol,
} from '@/constants/commonConst';
import MediaMeta from '@/core/mediaExtra';
import {produce} from 'immer';
import objectPath from 'object-path';

/**
 * 获取媒体项目的唯一标识key
 * @param mediaItem 媒体项目对象
 * @returns 格式为"platform@id"的字符串
 */
export function getMediaKey(mediaItem: ICommon.IMediaBase) {
    return `${mediaItem.platform}@${mediaItem.id}`;
}

/**
 * 解析媒体key，还原为媒体项目基础信息
 * @param key 媒体key字符串，可以是JSON格式或"platform@id"格式
 * @returns 包含platform和id的媒体基础对象
 * @throws 当key格式不正确或信息不完整时抛出错误
 */
export function parseMediaKey(key: string): ICommon.IMediaBase {
    try {
        const str = JSON.parse(key.trim());
        let platform, id;
        if (typeof str === 'string') {
            [platform, id] = str.split('@');
        } else {
            platform = str?.platform;
            id = str?.id;
        }
        if (!platform || !id) {
            throw new Error('mediakey不完整');
        }
        return {
            platform,
            id,
        };
    } catch (e: any) {
        throw e;
    }
}

/**
 * 比较两个媒体项目是否为同一个
 * 通过比较platform和id来判断
 * @param a 第一个媒体项目
 * @param b 第二个媒体项目
 * @returns 如果是同一个媒体项目返回true，否则返回false
 */
export function isSameMediaItem(
    a: ICommon.IMediaBase | null | undefined,
    b: ICommon.IMediaBase | null | undefined,
) {
    // eslint-disable-next-line eqeqeq
    return a && b && a.id == b.id && a.platform === b.platform;
}

/**
 * 检查媒体项目数组中是否包含指定的媒体项目
 * @param a 媒体项目数组
 * @param b 要查找的媒体项目
 * @returns 如果包含返回true，否则返回false
 */
export function includesMedia(
    a: ICommon.IMediaBase[] | null | undefined,
    b: ICommon.IMediaBase | null | undefined,
) {
    if (!a || !b) {
        return false;
    }
    return a.findIndex(_ => isSameMediaItem(_, b)) !== -1;
}

/**
 * 重置媒体项目，清除内部序列化数据并可选择性地更新平台信息
 * @param mediaItem 要重置的媒体项目
 * @param platform 新的平台标识（可选）
 * @param newObj 是否创建新对象，false表示直接修改原对象
 * @returns 重置后的媒体项目
 */
export function resetMediaItem<T extends Partial<ICommon.IMediaBase>>(
    mediaItem: T,
    platform?: string,
    newObj?: boolean,
): T {
    // 本地音乐不做处理
    if (
        mediaItem.platform === localPluginPlatform ||
        platform === localPluginPlatform
    ) {
        return newObj ? {...mediaItem} : mediaItem;
    }
    if (!newObj) {
        mediaItem.platform = platform ?? mediaItem.platform;
        mediaItem[internalSerializeKey] = undefined;
        return mediaItem;
    } else {
        return produce(mediaItem, _ => {
            _.platform = platform ?? mediaItem.platform;
            _[internalSerializeKey] = undefined;
        });
    }
}

/**
 * 合并媒体项目的属性
 * 保持id和platform不变，合并其他属性
 * @param mediaItem 基础媒体项目
 * @param props 要合并的属性对象
 * @param anotherProps 另一个要合并的属性对象（可选）
 * @returns 合并后的媒体项目
 */
export function mergeProps(
    mediaItem: ICommon.IMediaBase,
    props: Record<string, any> | undefined,
    anotherProps?: Record<string, any> | undefined | null,
) {
    return props
        ? {
              ...mediaItem,
              ...props,
              ...(anotherProps ?? {}),
              id: mediaItem.id,
              platform: mediaItem.platform,
          }
        : mediaItem;
}

/**
 * 内部数据类型枚举
 * 定义了可以存储在媒体项目内部的数据类型
 */
export enum InternalDataType {
    /** 本地文件路径 */
    LOCALPATH = 'localPath',
    /** 加入歌单的时间戳 */
    TIMESTAMP = 'timestamp',
    /** 排序索引，用于时间相同时的辅助排序 */
    SORTINDEX = 'sortIndex',
}

/**
 * 设置媒体项目的内部数据
 * @param mediaItem 媒体项目
 * @param key 数据类型键
 * @param value 要设置的值
 * @returns 更新后的媒体项目
 */
export function setInternalData<T extends ICommon.IMediaBase>(
    mediaItem: T,
    key: InternalDataType,
    value: string | number | undefined | null,
): T {
    return produce(mediaItem, draft => {
        objectPath.set(draft, `${internalSerializeKey}.${key}`, value);
    });
}

/**
 * 获取媒体项目的内部数据
 * @param mediaItem 媒体项目
 * @param key 数据类型键
 * @returns 获取到的数据值，如果不存在返回undefined
 */
export function getInternalData<T>(
    mediaItem: ICommon.IMediaBase | null | undefined,
    key: InternalDataType,
): T | undefined {
    if (!mediaItem) {
        return undefined;
    }
    return objectPath.get(mediaItem, `${internalSerializeKey}.${key}`);
}

/**
 * 清除媒体项目的内部数据
 * @param mediaItem 媒体项目
 * @returns 清除内部数据后的媒体项目，如果输入为空返回undefined
 */
export function trimInternalData(
    mediaItem: ICommon.IMediaBase | null | undefined,
) {
    if (!mediaItem) {
        return undefined;
    }
    return {
        ...mediaItem,
        [internalSerializeKey]: undefined,
    };
}

/**
 * 关联歌词到音乐项目
 * 将指定的歌词项目关联到音乐项目上
 * @param musicItem 音乐项目
 * @param linkto 要关联的歌词项目
 * @throws 当参数为空时抛出错误
 */
export async function associateLrc(
    musicItem: ICommon.IMediaBase,
    linkto: ICommon.IMediaBase,
) {
    if (!musicItem || !linkto) {
        throw new Error('');
    }

    // 如果相同直接断链
    MediaMeta.update(musicItem, {
        associatedLrc: isSameMediaItem(musicItem, linkto) ? undefined : linkto,
    });
}

/**
 * 根据时间戳和索引对数组进行排序
 * 优先按时间戳排序，时间戳相同时按排序索引排序
 * @param array 要排序的数组
 * @param newArray 是否创建新数组，false表示直接修改原数组
 * @returns 排序后的数组
 */
export function sortByTimestampAndIndex(array: any[], newArray = false) {
    if (newArray) {
        array = [...array];
    }
    return array.sort((a, b) => {
        const ts = a[timeStampSymbol] - b[timeStampSymbol];
        if (ts !== 0) {
            return ts;
        }
        return a[sortIndexSymbol] - b[sortIndexSymbol];
    });
}
