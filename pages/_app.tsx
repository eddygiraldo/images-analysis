import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import GlobalCSS from '../styles/globals';
import { MainContainer } from '../styles/home.styles';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      <Head>
        <title>Detection POC</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </ThemeProvider>
  );
}

export default MyApp;
