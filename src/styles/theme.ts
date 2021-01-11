import { DefaultTheme } from 'styled-components'
import * as styledComponents from 'styled-components/native'

export const appTheme: DefaultTheme = {
  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
}

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as styledComponents.ReactNativeThemedStyledComponentsModule<DefaultTheme>

export { ThemeProvider, css }
export default styled
