// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      light: string
      dark: string
      success: string
      warning: string
      danger: string
      bar: string
    }
  }
}