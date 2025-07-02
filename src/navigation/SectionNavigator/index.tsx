import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllocationDetails from "../../screens/AllocationDetails";

export default function SectionNavigator(){
    const Stack = createNativeStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="AllocationDetails"
                options={{headerShown: false, gestureEnabled: false}}
                component={AllocationDetails}
            />
        </Stack.Navigator>
    )
}