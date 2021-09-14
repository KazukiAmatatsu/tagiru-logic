import GlobalStyle from 'styles/GlobalStyle'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
