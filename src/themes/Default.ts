import { ThemeOptions } from "@material-ui/core";
import { lightBlue, purple } from "@material-ui/core/colors";

// https://v4.mui.com/customization/color/#color
export const Default: ThemeOptions = {
    palette: {
        type: "dark",
        primary: purple,
        secondary: lightBlue
    },
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    }
};
