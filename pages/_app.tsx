import GlobalStyle from 'styles/GlobalStyle'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
