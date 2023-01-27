import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider, useDispatch } from 'react-redux';

import Layout from './components/Layout';

import AddCar from './pages/AddCar';
import Car from './pages/Car';
import Cars from './pages/Cars';
import EmailVerification from './pages/EmailVerification';
import Home from './pages/Home';
import Login from './pages/Login'
import SnackbarNotification from './components/SnackbarNotification';
import Signup from './pages/Signup';

import { useUser } from './hooks/useUser';
import { ProtectedRoute } from './components/ProtectedRoute';
import store from './store';
import { clearMessages } from './snackbarMessagesSlice';

export default function App() {

  const [, setLoggedIn] = useState(!!useUser());
  const dispatch = useDispatch();

  const logOut = () => {
    fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(response => {
      if (!response.ok) throw response;
    }).finally(() => {
      localStorage.removeItem('user');
      setLoggedIn(false);
    });
    dispatch(clearMessages());
    // dispatch(logout());
  }

  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    // dispatch(login(data));
    setLoggedIn(true);
  }

  return (
    <BrowserRouter>
      <SnackbarNotification />
      <Routes>
        <Route path="/" element={<Layout logout={logOut} />} >
          <Route path="" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login login={logIn} />} />
          <Route path='/verify-email' element={<EmailVerification />} />
          <Route path="cars" element={<ProtectedRoute element={<Cars />} />} />
          <Route path="cars/:id" element={<ProtectedRoute element={<Car />} />} />
          <Route path="add-car" element={<ProtectedRoute element={<AddCar />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
