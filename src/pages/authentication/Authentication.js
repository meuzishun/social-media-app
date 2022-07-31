import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/Signup';

function Authentication({ changeUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login changeUser={changeUser} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default Authentication;
