import React from 'react';
import {StyleSheet} from 'react-native';
import rpx from '@/utils/rpx';
import {StandardNavBar} from '@/components/navigation';
import {ScreenWrapper} from '@/components/layout';
import Button from '@/components/base/textButton.tsx';
import Body from './body';
import {useNavigation} from '@react-navigation/native';

export default function SetCustomTheme() {
    const navigation = useNavigation();
    return (
        <ScreenWrapper useVerticalSafeArea>
            <StandardNavBar
                title="自定义背景"
                withStatusBar
                actionComponent={
                    <Button
                        style={styles.submit}
                        onPress={() => {
                            navigation.goBack();
                        }}
                        fontColor="appBarText">
                        完成
                    </Button>
                }
            />
            <Body />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        width: rpx(750),
    },
    submit: {
        justifyContent: 'center',
    },
});
