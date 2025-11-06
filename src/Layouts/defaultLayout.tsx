import {Header} from '../Components/Header'
import {Outlet} from 'react-router-dom'

export function DefaultLayout(){

    return(
    <>
        <Header/>
        <Outlet/>
    </>
    )
}