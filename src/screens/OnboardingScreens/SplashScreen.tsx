import {Image, SafeAreaView, StatusBar, View} from "react-native";
import FinscopeLogo from "../../assets/svg/FinscopeLogo.svg";
import React, {useCallback} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {checkIsSignedIn} from "../../services/signInHelper.ts";
import {useStatusBarOnFocus} from "../../hooks/useStatusBar.ts";

export default function SplashScreen() {
    useStatusBarOnFocus('light-content', '#282828')
    const navigation = useAppNavigation()

    // useStatusBarOnFocus('light-content', '#260210')
    useFocusEffect(
        useCallback(() => {
            console.log('useFocusEffect triggered');

            const handleNavigation = async () => {
                console.log('handleNavigation called');
                const isSignedIn = await checkIsSignedIn();
                console.log('isSignedIn:', isSignedIn);

                if (isSignedIn) {
                    console.log('Navigating to TabNavigator');
                    navigation.navigate("TabNavigator");
                } else {
                    console.log('Navigating to AuthenticationStack');
                    navigation.navigate("AuthenticationStack");
                }
            };

            const timeout = setTimeout(handleNavigation, 1500);
            console.log('Timeout set');

            return () => {
                console.log('Cleanup called - clearing timeout');
                clearTimeout(timeout);
            };
        }, [navigation])
    );

    return (
        <SafeAreaView className="flex-1">
            <StatusBar backgroundColor={'#282828'} barStyle={'light-content'}/>
            <View className="relative flex-1 items-center justify-center bg-secondary">
                <View className="z-20">
                    <FinscopeLogo/>
                </View>
                <View className="absolute left-0 top-0 right-0 bottom-0 z-0">
                    <Image source={require('../../assets/png/Pattern.png')} className=""/>
                </View>
            </View>
        </SafeAreaView>
    )
}