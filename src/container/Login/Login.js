import React, { useEffect, useState } from 'react'
import Header from './../components/Header'
import Card from './../components/Card'
import { isLoggedInUser, signin } from '../../actions/action'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Login = () => {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(()=>{
    if(!auth.authenticated){
      dispatch(isLoggedInUser())
    }
  }, [])

  const userLogin = (e) => {
    e.preventDefault();

    if(email===""){
      alert('Email is empty');
      return;
    }
    if(password===""){
      alert('Password is empty');
      return;
    }

    dispatch(signin({email, password}))

    
  }

  if(auth.authenticated){
    return <Navigate exact to='/'/>
  }

  return (
    <>
      <Header/>
      <div className='loginContainer'> 
        <Card>
          <form action="" onSubmit={userLogin}>
            <h3>Login</h3>
            <input 
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
            />

            <input 
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
            />

            <div>
              <button>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </>

  )
}

export default Login