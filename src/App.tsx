import {ThemeProvider} from 'styled-components'
import {defaultTheme} from './Styles/Themes/default.ts'
import { Router } from './router.tsx'
import {BrowserRouter} from 'react-router-dom';
import { GlobalStyle } from './Styles/globalStyles.ts';

export function App() {
  
  return (
    <ThemeProvider theme={{defaultTheme}}>
       <BrowserRouter>
          < Router/>
       </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}


