import React, { useState } from 'react'
import RegisterationForm from './RegistrationForm'
import SignIn from './SignIn'
import Sidebg from './Sidebg'



const Form = () => {
  const [isNewUser,setIsNewUser]=useState(false)
  return (
    <div className="container">
      <div className="main d-flex">
        <div className="w-50 d-flex align-items-center">
          {isNewUser ? <RegisterationForm isNewUser={isNewUser} setIsNewUser={setIsNewUser}/>:<SignIn isNewUser={isNewUser} setIsNewUser={setIsNewUser}/>}
        </div>
        <div className="w-50 d-sm-none">
          <Sidebg/>
        </div>
      </div>
    </div>
  )
}

export default Form