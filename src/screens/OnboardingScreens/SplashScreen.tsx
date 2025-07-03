import {SafeAreaView, View} from "react-native";
import FinscopeLogo from "../../assets/svg/FinscopeLogo.svg";
import {useCallback} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {useAppNavigation} from "../../common/navigationHelper.ts";

export default function SplashScreen(){
    const navigation = useAppNavigation()
    // const storage = new MMKV();

    // useStatusBarOnFocus('light-content', '#260210')

    useFocusEffect(
        useCallback(() => {
            // const isLoggedIn = storage.getBoolean("isLoggedIn") || false;
            const isLoggedIn = true;
            const timeout = setTimeout(() => {
                if (isLoggedIn) {
                    navigation.navigate("TabNavigator");
                } else {
                    navigation.navigate("AuthenticationStack");
                }
            }, 1500);

            return () => clearTimeout(timeout);
        }, [])
    );

    return(
        <SafeAreaView className="flex-1">
            <View className="flex-1 items-center justify-center bg-secondary">
                <FinscopeLogo/>
            </View>
        </SafeAreaView>
    )
}