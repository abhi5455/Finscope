import {AuthenticationStack} from "./AuthenticationStack.tsx";
import {Fragment, useEffect, useState} from "react";
import SectionNavigator from "../SectionNavigator";
import TabNavigator from "../TabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SplashScreen from "../../screens/OnboardingScreens/SplashScreen.tsx";
import {checkIsSignedIn} from "../../services/signInHelper.ts";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const signedIn = await checkIsSignedIn();
            setIsSignedIn(signedIn);
        })();
    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SplashScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={SplashScreen}
            />
            {/*{isSignedIn*/}
            {/*    ?*/}
            <Fragment>
                <Stack.Screen
                    name="TabNavigator"
                    options={{headerShown: false, gestureEnabled: false}}
                    component={TabNavigator}
                />
                <Stack.Screen
                    name="SectionNavigator"
                    options={{headerShown: false, gestureEnabled: false}}
                    component={SectionNavigator}
                />
            </Fragment>
            {/*:*/}
            <Stack.Screen
                name="AuthenticationStack"
                options={{headerShown: false, gestureEnabled: false}}
                component={AuthenticationStack}
            />
            {/*}*/}
        </Stack.Navigator>
    )
}