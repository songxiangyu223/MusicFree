import React from 'react';
import {Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import rpx from '@/utils/rpx';
import useColors from '@/hooks/useColors';
import ThemeText from '@/components/base/themeText';
import Color from 'color';
import IconButton from '@/components/base/iconButton';
import Icon from '@/components/base/icon';
import {ROUTE_PATH} from '@/core/router';

interface IHomeNavBarProps {
    /** 搜索框占位符文本 */
    searchPlaceholder?: string;
    /** 搜索框点击回调 */
    onSearchPress?: () => void;
    /** 菜单按钮点击回调 */
    onMenuPress?: () => void;
    /** 容器样式 */
    containerStyle?: StyleProp<ViewStyle>;
    /** 搜索框样式 */
    searchBarStyle?: StyleProp<ViewStyle>;
}

/**
 * 主页导航栏组件
 * 包含菜单按钮和搜索框
 */
export default function HomeNavBar(props: IHomeNavBarProps) {
    const {
        searchPlaceholder = '点击这里开始搜索',
        onSearchPress,
        onMenuPress,
        containerStyle,
        searchBarStyle,
    } = props;

    const navigation = useNavigation<any>();
    const colors = useColors();

    const handleMenuPress = () => {
        if (onMenuPress) {
            onMenuPress();
        } else {
            navigation?.openDrawer();
        }
    };

    const handleSearchPress = () => {
        if (onSearchPress) {
            onSearchPress();
        } else {
            navigation.navigate(ROUTE_PATH.SEARCH_PAGE);
        }
    };

    return (
        <View style={[styles.appbar, containerStyle]}>
            <IconButton
                accessibilityLabel="打开侧边栏"
                name="bars-3"
                style={styles.menu}
                color={colors.text}
                onPress={handleMenuPress}
            />

            <Pressable
                style={[
                    styles.searchBar,
                    {
                        backgroundColor: colors.placeholder,
                    },
                    searchBarStyle,
                ]}
                accessible
                accessibilityLabel="点击这里开始搜索"
                onPress={handleSearchPress}
            >
                <Icon
                    accessible={false}
                    name="magnifying-glass"
                    size={rpx(32)}
                    color={Color(colors.text).alpha(0.6).toString()}
                />
                <ThemeText
                    accessible={false}
                    fontSize="subTitle"
                    style={styles.text}
                >
                    {searchPlaceholder}
                </ThemeText>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: rpx(88),
    },
    searchBar: {
        marginHorizontal: rpx(24),
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: '72%',
        maxHeight: rpx(64),
        borderRadius: rpx(36),
        paddingHorizontal: rpx(20),
    },
    text: {
        marginLeft: rpx(12),
        opacity: 0.6,
    },
    menu: {
        marginLeft: rpx(24),
    },
});