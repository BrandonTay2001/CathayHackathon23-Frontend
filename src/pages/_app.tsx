import Head from "next/head";
import "../styles/globals.css";
import "../styles/Orb.scss";
import {AppProps} from "next/app";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import {StyledEngineProvider} from "@mui/material";
import ClientOnly from "../utils/ClientOnly";
import {SnackbarProvider} from "notistack";
import {purple} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#009688"
        },
        secondary: {
            main: "#1de9b6",
        },
        // primary: {
        //     light: '#fff',
        //     main: '#fff',
        //     dark: '#fff',
        //     contrastText: '#fff',
        // }
    }
});

export default function MyApp({Component, pageProps}: AppProps) {
    return <>
        <Head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport"
                // content="viewport-fit=cover,width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
            />
            <meta name="description" content="Description"/>
            <meta name="keywords" content="Keywords"/>
            <title>TravelMate</title>

            <link rel="manifest" href="/manifest.json"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="apple-mobile-web-app-capable" content="yes"></meta>
            {/*<meta name="apple-mobile-web-app-status-bar-style" content="black"></meta>*/}
        </Head>
        <ClientOnly>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <SnackbarProvider maxSnack={1} preventDuplicate autoHideDuration={3000}>
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </ClientOnly>
    </>;
}
