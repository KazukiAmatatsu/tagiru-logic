export const theme = {
  color: '#333',
  background: '#E5E5E5',
  colors: {
    red: '#FF3300', // 1Pカラー
    blue: '#0000FF', // 2Pカラー
    yellow: '#FFFF00', // 3Pカラー
    green: '#00FF00', // 4Pカラー
    gray: '#808080',
  },
  line: {
    background: '#7494C0',
    green: '#06c755',
    black: '#000',
    white: '#fff',
  },
}

type Theme = typeof theme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
