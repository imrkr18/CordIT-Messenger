import React from 'react'
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './container/Login/Login'
import Register from './container/Register/Register'
import PrivateRoute from './container/components/PrivateRoute'
import { useDispatch } from 'react-redux'
import { isLoggedInUser } from './actions/auth.action'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const App = () =>{

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(()=>{
        if(!auth.authenticated){
        dispatch(isLoggedInUser())
        }
    }, [])


    return(
        <div className="App">

            <Router>
                <Routes>

                    <Route exact path='*' element={<PrivateRoute path='/' exact element = 'HomePage'/>}> </Route> 
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='/signup' element={<Register/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
