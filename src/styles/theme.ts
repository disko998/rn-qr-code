import { DefaultTheme } from 'styled-components'
import * as styledComponents from 'styled-components/native'

export const appTheme: DefaultTheme = {
  colors: {
    primary: '#1b64a8',
    secondary: '#3d8af7',
    light: '#fff',
    dark: '#403d39',
    black: '#000',
    success: '#39ecad',
    warning: '#fda40f',
    danger: '#e61610',
    bar: 'rgba(27, 100, 168, 0.9)',
    gray: '#d6d6d6',
    darkGray: '#aaaaaa',
  },
}

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<DefaultTheme>

export { ThemeProvider, css }
export default styled
