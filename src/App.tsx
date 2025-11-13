import {ThemeProvider} from 'next-themes'
import { Router } from './router.tsx'
import {BrowserRouter} from 'react-router-dom';
import { GlobalStyle } from './Styles/globalStyles.ts';


export function App() {
  
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
       <BrowserRouter>
       <GlobalStyle />
          < Router/>
       </BrowserRouter>
      
    </ThemeProvider>
  )
}


