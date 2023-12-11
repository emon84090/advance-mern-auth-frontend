import createTheme from "@mui/material/styles/createTheme";

export const Colors = {
  main: "#363062",
  second: "#fff",
  textcolor: "#0e2431",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: Colors.main,
      white: Colors.second,
      text: Colors.textcolor,
    },

    // background: {
    //     default: '#FAC270',
    // },

    mode: "light",
  },
  typography: {
    fontFamily: "Open Sans",
  },

  components: {
    muiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        color: "primary",
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
              @font-face {
                font-family: 'Open Sans';

              }
            `,
    },
  },
});
