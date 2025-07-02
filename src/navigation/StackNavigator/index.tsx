import {AuthenticationStack} from "./AuthenticationStack.tsx";
import {Fragment, useState} from "react";
import SectionNavigator from "../SectionNavigator";
import TabNavigator from "../TabNavigator";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <Stack.Navigator>
            {isLoggedIn
                ?
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
                :
                <Stack.Screen
                    name="AuthenticationStack"
                    options={{headerShown: false, gestureEnabled: false}}
                    component={AuthenticationStack}
                />
            }
        </Stack.Navigator>
    )
}