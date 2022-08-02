import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/Signup';

function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default Authentication;
