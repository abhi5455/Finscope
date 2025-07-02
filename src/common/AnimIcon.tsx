import {ColorValue} from 'react-native';
import React, {FC, useEffect} from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface props {
    focused: boolean;
    color: ColorValue;
    children: React.ReactNode;
}

const AnimIcon: FC<props> = ({focused, color, children}) => {
    const focusedValue = useSharedValue(1);
    useEffect(() => {
        if (focused) {
            focusedValue.value = withSpring(0.5, {duration: 200}, () => {
                focusedValue.value = withSpring(1, {duration: 200});
            });
        }
    }),
        [focused];

    const animStyle = useAnimatedStyle(() => {
        return {transform: [{scale: focusedValue.value}]};
    });

    return <Animated.View style={animStyle}>{children}</Animated.View>;
};

export default AnimIcon;
