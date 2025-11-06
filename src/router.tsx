import {Routes, Route} from 'react-router-dom';
import { Home } from './Pages/Home';
import { Clients } from './Pages/Clients';
import { Calendar } from './Pages/Calendar';
import { DefaultLayout } from './Layouts/defaultLayout';




export function Router(){

    return(
    
        <Routes>
            <Route path='/' element={<DefaultLayout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/clientes' element={<Clients/>}/>
                <Route path='/calendário' element={<Calendar/>}/>
            </Route>
        </Routes>

    )
}