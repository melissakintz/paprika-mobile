import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
    done: "#ffcad4",
    inprogress: "#ffe5d9",
    open: "#d8e2dc",
  },
};

export default theme;
