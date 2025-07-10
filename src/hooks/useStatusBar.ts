import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, StatusBarStyle } from 'react-native';
import { useCallback } from 'react';

export function useStatusBarOnFocus(
    barStyle: StatusBarStyle,
    backgroundColor: string,
    resetStyle: StatusBarStyle = 'light-content',
    resetColor: string = '#000'
) {
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle(barStyle);
            StatusBar.setBackgroundColor(backgroundColor);

            return () => {
                StatusBar.setBarStyle(resetStyle);
                StatusBar.setBackgroundColor(resetColor);
            };
        }, [barStyle, backgroundColor, resetStyle, resetColor])
    );
}
