import { createTheme, ThemeOptions } from '@material-ui/core';

const theme: ThemeOptions = createTheme({
    // examples for options in themes
    typography: {
        fontFamily: `'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    },
    direction: 'rtl',
    palette: {},
});

export default theme;
