import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import CheckIn from '~/pages/CheckIn';
import HelpOrderList from '~/pages/HelpOrder/List';
import HelpOrderAnswer from '~/pages/HelpOrder/Answer';
import HelpOrderNew from '~/pages/HelpOrder/New';

export default createAppContainer(
    createSwitchNavigator({
        Login: createSwitchNavigator({
            SignIn,
        }),
        App: createBottomTabNavigator(
            {
                CheckIn,
                HelpOrder: {
                    screen: createStackNavigator({
                        HelpOrderList,
                        HelpOrderAnswer,
                        HelpOrderNew,
                    }),
                    navigationOptions: {
                        tabBarLabel: 'Pedir ajuda',
                        tabBarIcon: (
                            <Icon
                                name="add-circle-outline"
                                size={20}
                                color="rgba(255, 255, 255, 0.6)"
                            />
                        ),
                    },
                },
            },
            {
                tabBarOptions: {
                    keyboardHidesTabBar: true,
                    activeTintColor: '#ee4e62',
                    inactiveTintColor: '#999',
                    style: {
                        backgroundColor: '#FFF',
                    },
                },
            }
        ),
    })
);
