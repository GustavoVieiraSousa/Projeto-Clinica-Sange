import {ThemeProvider} from 'styled-components'
import {defaultTheme} from './Styles/Themes/default.ts'
import { Router } from './router.tsx'
import {BrowserRouter} from 'react-router-dom';

export function App() {
  
  return (
    <ThemeProvider theme={{defaultTheme}}>
       <BrowserRouter>
          < Router/>
       </BrowserRouter>

    </ThemeProvider>
  )
}


