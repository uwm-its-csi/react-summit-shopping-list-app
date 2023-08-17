import { createTheme } from '@mui/material/styles';

/**
 * CreateTheme.js - This function will create a theme to be used by most of the screens in the application.
 *
 * @author Tom Soluri
 * @version 1.0
 * @since 2023-08-01
 */
export const muiTheme = createTheme({
    palette: {
      primary: {
        main: '#ff4400',
        mainGradient: "linear-gradient(95deg,#32006e,#32006e 45%,#76236c)",
      },
    }
});