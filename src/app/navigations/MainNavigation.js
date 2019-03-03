import React from 'react';
import { 
    createAppContainer, 
    createStackNavigator, 
    createBottomTabNavigator, 
    createDrawerNavigator,
    createSwitchNavigator
} from "react-navigation";
import { StyleSheet } from 'react-native'
import { HomeScreen, ProfileScreen, StarterScreen } from '../screens';
import { Icon } from 'react-native-elements'
import { color } from '../../constants/colors'

import data from '../../constants/data'


const styles = StyleSheet.create({
    menuLeft: {
        padding: 10
    }
})

const HomeStackNavigation = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: data.appName,
            headerStyle: {
                backgroundColor: color.red
            },
            // headerLeft: () => <Icon 
            //     name="menu" 
            //     size={30} 
            //     color={color.textPrimary} 
            //     onPress={() => navigation.navigate('DrawerOpen')} 
            //     iconStyle={styles.menuLeft}
            // />,
            headerTintColor: color.textPrimary,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        })
    },
    Capture: {
        screen: ProfileScreen,
        navigationOptions: () => ({
            title: "Capture Photo",
            headerStyle: {
                backgroundColor: color.red
            },
            headerTintColor: color.textPrimary,
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        })
    }
})


const RootSwitch = createSwitchNavigator(
    { StarterScreen, HomeStackNavigation },
    { initialRouteName: "StarterScreen" }
);

export const MainNavigation = createAppContainer(RootSwitch);

