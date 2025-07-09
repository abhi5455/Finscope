import {SafeAreaView, View} from "react-native";
import FinscopeLogo from "../../assets/svg/FinscopeLogo.svg";
import {useCallback} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {useAppNavigation} from "../../common/navigationHelper.ts";
import {checkIsSignedIn} from "../../services/signInHelper.ts";

export default function SplashScreen(){
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

    return(
        <SafeAreaView className="flex-1">
            <View className="flex-1 items-center justify-center bg-secondary">
                <FinscopeLogo/>
            </View>
        </SafeAreaView>
    )
}