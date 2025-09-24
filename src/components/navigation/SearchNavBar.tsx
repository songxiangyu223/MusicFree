import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import rpx from '@/utils/rpx';
import useColors from '@/hooks/useColors';
import AppBar from '@/components/base/appBar';
import Input from '@/components/base/input';
import Color from 'color';
import Button from '@/components/base/textButton';
import IconButton from '@/components/base/iconButton';
import {iconSizeConst} from '@/constants/uiConst';
import Icon from '@/components/base/icon';

interface ISearchNavBarProps {
    /** 搜索值 */
    value: string;
    /** 搜索值变化回调 */
    onChangeText: (text: string) => void;
    /** 搜索提交回调 */
    onSubmit: () => void;
    /** 清空搜索回调 */
    onClear?: () => void;
    /** 焦点事件回调 */
    onFocus?: () => void;
    /** 占位符文本 */
    placeholder?: string;
    /** 搜索按钮文本 */
    searchButtonText?: string;
    /** 是否自动聚焦 */
    autoFocus?: boolean;
    /** 容器样式 */
    containerStyle?: StyleProp<ViewStyle>;
    /** 搜索框样式 */
    searchBarStyle?: StyleProp<ViewStyle>;
}

/**
 * 搜索导航栏组件
 * 集成了搜索输入框和相关操作
 */
export default function SearchNavBar(props: ISearchNavBarProps) {
    const {
        value,
        onChangeText,
        onSubmit,
        onClear,
        onFocus,
        placeholder = '输入要搜索的内容',
        searchButtonText = '搜索',
        autoFocus = false,
        containerStyle,
        searchBarStyle,
    } = props;

    const colors = useColors();
    const hintTextColor = Color(colors.text).alpha(0.6).toString();

    const handleClear = () => {
        onChangeText('');
        onClear?.();
    };

    return (
        <AppBar containerStyle={[styles.appbar, containerStyle]} contentStyle={styles.appbar}>
            <View style={styles.searchBarContainer}>
                <Icon
                    name="magnifying-glass"
                    color={hintTextColor}
                    size={iconSizeConst.small}
                    style={styles.magnify}
                />
                <Input
                    autoFocus={autoFocus}
                    style={[
                        styles.searchBar,
                        {
                            color: colors.text,
                            backgroundColor: colors.pageBackground,
                        },
                        searchBarStyle,
                    ]}
                    accessible
                    accessibilityLabel="搜索框"
                    accessibilityHint={`输入要搜索的内容`}
                    onFocus={onFocus}
                    placeholderTextColor={hintTextColor}
                    placeholder={placeholder}
                    onSubmitEditing={onSubmit}
                    onChangeText={onChangeText}
                    value={value}
                />
                {value.length > 0 && (
                    <IconButton
                        style={styles.close}
                        sizeType="light"
                        onPress={handleClear}
                        color={hintTextColor}
                        name="x-mark"
                    />
                )}
            </View>
            <Button
                style={styles.button}
                hitSlop={0}
                fontColor="appBarText"
                onPress={onSubmit}
            >
                {searchButtonText}
            </Button>
        </AppBar>
    );
}

const styles = StyleSheet.create({
    appbar: {
        paddingRight: 0,
    },
    button: {
        paddingHorizontal: rpx(24),
        height: '100%',
        justifyContent: 'center',
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar: {
        minWidth: rpx(375),
        flex: 1,
        paddingHorizontal: rpx(64),
        borderRadius: rpx(64),
        height: rpx(64),
        maxHeight: rpx(64),
        alignItems: 'center',
    },
    magnify: {
        position: 'absolute',
        left: rpx(16),
        zIndex: 100,
    },
    close: {
        position: 'absolute',
        right: rpx(16),
    },
});