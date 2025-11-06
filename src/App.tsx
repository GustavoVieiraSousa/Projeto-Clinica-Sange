import {ThemeProvider} from 'styled-components'
import {defaultTheme} from './Styles/Themes/default.ts'

export function App() {
  
  return (
    <ThemeProvider theme={{defaultTheme}}>

    </ThemeProvider>
  )
}


