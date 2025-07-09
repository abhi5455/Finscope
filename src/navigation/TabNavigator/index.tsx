import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Dimensions, StyleSheet, View} from "react-native";
import AnimIcon from "../../common/AnimIcon.tsx";
import HomeScreen from "../../screens/HomeScreen";
import HomeIcon from '../../assets/svg/HomeIcon.svg'
import HomeIconFocused from '../../assets/svg/HomeIconFocused.svg'
import SavedIcon from '../../assets/svg/SavedIcon.svg'
import SavedIconFocused from '../../assets/svg/SavedIconFocused.svg'
import TransactionIcon from '../../assets/svg/TransactionIcon.svg'
import TransactionIconFocused from '../../assets/svg/TranscationIconFocused.svg'
import ProfileIcon from '../../assets/svg/ProfileIcon.svg'
import ProfileIconFocused from '../../assets/svg/ProfileIconFocused.svg'
import {useEffect, useState} from "react";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import AllTransactionScreen from "../../screens/AllTransactionScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SavedAllocationsScreen from "../../screens/SavedAllocationsScreen";

export default function TabNavigator() {
    const Tab = createBottomTabNavigator()

    function getOrientation() {
        const {width, height} = Dimensions.get('window');
        return width > height ? 'landscape' : 'portrait';
    }

    const [orientation, setOrientation] = useState(getOrientation());
    console.log("orientation", orientation);
    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(getOrientation());
        };

        const subscription = Dimensions.addEventListener(
            "change",
            handleOrientationChange
        );

        return () => {
            subscription?.remove();
        };
    }, []);
    const isTabBarVisible = (route: any) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName == "CreateTestScreen") {
            return "none";
        } else {
            return "flex";
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <HomeIconFocused/>
                                    </View>
                                ) : (
                                    <HomeIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
            <Tab.Screen
                name="SavedAllocationsScreen"
                component={SavedAllocationsScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <SavedIconFocused/>
                                    </View>
                                ) : (
                                    <SavedIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
            <Tab.Screen
                name="TranscationScreen"
                component={AllTransactionScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <TransactionIconFocused/>
                                    </View>
                                ) : (
                                    <TransactionIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={({route}) => ({
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused, color}) => {
                        return (
                            <AnimIcon focused={focused} color={color}>
                                {focused ? (
                                    <View>
                                        <ProfileIconFocused/>
                                    </View>
                                ) : (
                                    <ProfileIcon/>
                                )}
                            </AnimIcon>
                        );
                    },
                    tabBarStyle: {
                        ...styles.tabBar,
                        display: isTabBarVisible(route),
                    },
                })}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#2e2e2e',
        borderTopWidth: 1,
        borderTopColor: '#363d3a',
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: 12,
        height: 65,
        position: "absolute",
    },
    activeLabel: {
        fontFamily: "Poppins-Medium",
        color: "#6C737F",
        fontSize: 10,
        lineHeight: 13.13,
        // top: responsiveSize(-10),
        borderWidth: 0,
    },
    inActiveLabel: {
        fontFamily: "Poppins-Medium",
        color: "#FFF",
        fontSize: 10,
        lineHeight: 13.13,
        top: -10,
    },
    activeWrapper: {
        borderWidth: 0,
        backgroundColor: "#FFF2E6",
        borderRadius: 100,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
});