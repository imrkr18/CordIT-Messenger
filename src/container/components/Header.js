import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { logout  } from '../../actions/auth.action'
import './header.css'

const Header = () => {

    const auth = useSelector(state=>state.auth);
    const dispatch = useDispatch();




  return (
    <header className='header'>
        <div style={{display:'flex'}}>
            <div className="logo"><Link to={'/'}>Cord-IT messenger</Link></div>

            {
                !auth.authenticated ? 
                <ul className='leftmenu'>
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <li><NavLink to={'/signup'}>Sign Up</NavLink></li>
            </ul> : null
            }
            
        </div>

        <div style={{margin:'20px 0px 20px 800px', color:'#000', fontWeight:'bold'}}>Hi {auth.authenticated ? `${auth.firstName} ${auth.lastName}` : `Cord-ITer` }</div>
        <ul className='menu'>
            {
                auth.authenticated ? 
                <li>
                    <Link to={'#'} onClick={()=>{
                        console.log(auth.uid)
                        dispatch(logout(auth.uid))
                    }}>Logout</Link>
                </li> : null
            }
            
        </ul>
    </header>
  )

}

export default Header


// I have not yet applied the props part 