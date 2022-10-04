import React, { useState } from 'react'
import Header from './../components/Header'
import Card from './../components/Card'
import './register.css'
import { signup } from '../../actions/action'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Register = () => {

  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const registerUser = (e) => {
    e.preventDefault()
    const user = {firstName, lastName, email, password}
    dispatch(signup(user))
  }
  
  if(auth.authenticated){
    return <Navigate exact to='/'/>
  }
  return (
    <>
      <Header/>
      <div className='registerContainer'> 
        <Card>
          <form action="" onSubmit={registerUser}>
            <h3>Register</h3>
            <input 
              type="text"
              value={firstName}
              onChange={(e)=>setfirstName(e.target.value)}
              placeholder="First Name"
            />

            <input 
              type="text"
              value={lastName}
              onChange={(e)=>setlastName(e.target.value)}
              placeholder="Last Name"
            />

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
              <button>Sign Up</button>
            </div>
          </form>
        </Card>
      </div>
    </>
  )
}

export default Register