import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'

const PrivateRoute = ({element:Element, ...rest}) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return (
      <Routes>
        <Route {...rest} element={user ? <HomePage/> : <Navigate to='/login'/>} />
      </Routes>
  )
}

export default PrivateRoute