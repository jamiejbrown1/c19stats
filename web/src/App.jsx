import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Stats from './stats/Stats';
import theme from './theme';
import i18n from './i18n/i18n';
import SnackbarProvider from 'material-ui-snackbar-provider/lib/SnackbarProvider';

const useStyles = makeStyles(() => ({
    app: {
        height: '100vh',
    },
}));

function App() {
    const classes = useStyles();
    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <Box className={classes.app}>
                        <Stats />
                    </Box>
                </SnackbarProvider>
            </ThemeProvider>
        </I18nextProvider>
    );
}

export default App;
