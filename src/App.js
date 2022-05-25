import React from 'react'
import './App.css';
import Form from './Components/Form';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import ProtectedRoute from './Routes/ProtectedRoute';
import SignIn from './Components/SignIn';
import RegisterationForm from './Components/RegistrationForm';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/register' element={<RegisterationForm/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
