import { ThemeOptions } from "@material-ui/core";
import { lightBlue, purple } from "@material-ui/core/colors";

// https://v4.mui.com/customization/color/#color
// https://bareynol.github.io/mui-theme-creator/
export const Default: ThemeOptions = {
    palette: {
        type: "dark",
        primary: {
            main: "#220021",
            contrastText: "#6EC5C2"
        },
        secondary: {
            main: "#6EC5C2",
            light: "#9EE4E1",
            dark: "#347C7C"
        }
    },
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    }
};
