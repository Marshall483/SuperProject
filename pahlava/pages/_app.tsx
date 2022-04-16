import Head from "next/head";
import { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../theme";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Pahlava</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
