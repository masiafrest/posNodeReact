import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";

export default function UseThemeProvider({ children }) {
  const darkMode = useSelector((state) => state.user.darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        // overrides: {
        //   MuiAppBar: {
        //     colorPrimary: {
        //       backgroundColor: "#ff7961",
        //     },
        //     colorSecondary: {
        //       backgroundColor: "#3f51b5",
        //     },
        //   },
        // },
        palette: {
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
