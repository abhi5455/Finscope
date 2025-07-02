/** @type {import('tailwindcss').Config} */
import { platformSelect } from "nativewind/theme";
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#56eba6',
                secondary: '#282828',
            },
            fontFamily: {
                inter: ["Inter_24pt-Regular"],
                interLight: ["Inter_24pt-Light"],
                interMedium: ["Inter_24pt-Medium"],
                interSemiBold: ["Inter_24pt-SemiBold"],
                interBold: ["Inter_24pt-Bold"],
                inter500: ["Inter_24pt-500Medium"],
            },
        },
    },
    plugins: [],
};
