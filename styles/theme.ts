export const theme = {
  color: '#333',
  background: '#E5E5E5',
  colors: {
    red: '#FF3300',
    blue: '#0000FF',
    yellow: '#FFFF00',
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
