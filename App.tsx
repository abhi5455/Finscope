import 'react-native-url-polyfill/auto';
import "./global.css"
import {SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {StackNavigator} from "./src/navigation/StackNavigator";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {


    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <SafeAreaView className="flex-1">
                <NavigationContainer>
                    <StackNavigator/>
                </NavigationContainer>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}