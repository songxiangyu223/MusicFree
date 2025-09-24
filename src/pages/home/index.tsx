import React from 'react';
import {StyleSheet} from 'react-native';

import NavBar from './components/navBar';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeDrawer from './components/drawer';
import {PageLayout} from '@/components/layout';
import HomeBody from './components/homeBody';
import HomeBodyHorizontal from './components/homeBodyHorizontal';
import useOrientation from '@/hooks/useOrientation';

function Home() {
    const orientation = useOrientation();

    return (
        <PageLayout>
            <NavBar />
            {orientation === 'vertical' ? (
                <HomeBody />
            ) : (
                <HomeBodyHorizontal />
            )}
        </PageLayout>
    );
}

// function Body() {
//     const orientation = useOrientation();
//     return (
//         <ScrollView
//             style={[
//                 styles.appWrapper,
//                 orientation === 'horizontal' ? styles.flexRow : null,
//             ]}>
//             <Operations orientation={orientation} />
//         </ScrollView>
//     );
// }

const LeftDrawer = createDrawerNavigator();
export default function App() {
    return (
        <LeftDrawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: '80%',
                },
            }}
            initialRouteName="HOME-MAIN"
            drawerContent={props => <HomeDrawer {...props} />}>
            <LeftDrawer.Screen name="HOME-MAIN" component={Home} />
        </LeftDrawer.Navigator>
    );
}

const styles = StyleSheet.create({
    appWrapper: {
        flexDirection: 'column',
        flex: 1,
    },
    flexRow: {
        flexDirection: 'row',
    },
});
