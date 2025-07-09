import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../../screens/OnboardingScreens/LoginScreen.tsx";

export const AuthenticationStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                options={{headerShown: false, gestureEnabled: false}}
                component={LoginScreen}
            />
            {/*<Stack.Screen*/}
            {/*    name="OTPScreen"*/}
            {/*    options={{headerShown: false, gestureEnabled: false}}*/}
            {/*    component={OTPScreen}*/}
            {/*/>*/}
        </Stack.Navigator>
    )
}