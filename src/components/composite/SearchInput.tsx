import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import rpx from '@/utils/rpx';
import useColors from '@/hooks/useColors';
import Input from '@/components/base/input';
import Color from 'color';
import IconButton from '@/components/base/iconButton';
import {iconSizeConst} from '@/constants/uiConst';
import Icon from '@/components/base/icon';

interface ISearchInputProps {
    /** 搜索值 */
    value: string;
    /** 搜索值变化回调 */
    onChangeText: (text: string) => void;
    /** 搜索提交回调 */
    onSubmit?: () => void;
    /** 清空搜索回调 */
    onClear?: () => void;
    /** 焦点事件回调 */
    onFocus?: () => void;
    /** 失焦事件回调 */
    onBlur?: () => void;
    /** 占位符文本 */
    placeholder?: string;
    /** 是否自动聚焦 */
    autoFocus?: boolean;
    /** 是否显示清除按钮 */
    showClearButton?: boolean;
    /** 是否显示搜索图标 */
    showSearchIcon?: boolean;
    /** 容器样式 */
    containerStyle?: StyleProp<ViewStyle>;
    /** 输入框样式 */
    inputStyle?: StyleProp<ViewStyle>;
    /** 是否可编辑 */
    editable?: boolean;
}

/**
 * 通用搜索输入组件
 * 集成了搜索图标、清除按钮等常用功能
 */
export default function SearchInput(props: ISearchInputProps) {
    const {
        value,
        onChangeText,
        onSubmit,
        onClear,
        onFocus,
        onBlur,
        placeholder = '请输入搜索内容',
        autoFocus = false,
        showClearButton = true,
        showSearchIcon = true,
        containerStyle,
        inputStyle,
        editable = true,
    } = props;

    const colors = useColors();
    const hintTextColor = Color(colors.text).alpha(0.6).toString();

    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    const handleChangeText = (text: string) => {
        onChangeText(text);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {showSearchIcon && (
                <Icon
                    name="magnifying-glass"
                    color={hintTextColor}
                    size={iconSizeConst.small}
                    style={styles.searchIcon}
                />
            )}
            <Input
                autoFocus={autoFocus}
                editable={editable}
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        backgroundColor: colors.pageBackground || colors.background,
                    },
                    showSearchIcon && styles.inputWithIcon,
                    inputStyle,
                ]}
                placeholder={placeholder}
                placeholderTextColor={hintTextColor}
                onFocus={onFocus}
                onBlur={onBlur}
                onSubmitEditing={onSubmit}
                onChangeText={handleChangeText}
                value={value}
                returnKeyType="search"
            />
            {showClearButton && value.length > 0 && (
                <IconButton
                    style={styles.clearButton}
                    sizeType="light"
                    onPress={handleClear}
                    color={hintTextColor}
                    name="x-mark"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        flex: 1,
        height: rpx(64),
        borderRadius: rpx(32),
        paddingHorizontal: rpx(20),
        fontSize: rpx(28),
    },
    inputWithIcon: {
        paddingLeft: rpx(56),
    },
    searchIcon: {
        position: 'absolute',
        left: rpx(16),
        zIndex: 1,
    },
    clearButton: {
        position: 'absolute',
        right: rpx(16),
        zIndex: 1,
    },
});