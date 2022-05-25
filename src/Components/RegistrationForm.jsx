import React, {useEffect, useState} from 'react'
import './SignIn.css'
import Google from '../Background.png'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import apiCalls from '../APIS/apiCalls'
import Sidebg from './Sidebg'
import { Link } from 'react-router-dom'


const RegisterationForm = ({setIsNewUser, isNewUser}) => {
    const registerUrl="http://localhost:5000/users/register"
    const navigate=useNavigate()


    const [user,setUser]=useState([])

    useEffect(()=>{

        console.log(user,"use Effec")

    },[user])
    const onSuccessWithGoogle=(res)=>{
        console.log(res);
        localStorage.setItem("data", JSON.stringify(res))
        navigate('dashboard')
    }

    const onFailureWithGoogle=(res)=>{
        console.log(res);

    }
    
    
    const [validation, setValidation] = useState({
        name: {
            value: "",
            error: false,
            errorText: "Please enter your name"
        },
        email: {
            value: "",
            error: false,
            errorText: "Please Fill out this Field before submitting"
        },
        password: {
            value: "",
            error: false,
            errorText: "Please enter Password"
        }
    })
    console.log(validation);
    const onChangeHandler = (e) => {
        setValidation({
            ...validation,
            [e.target.name]: {
                ...validation[e.target.name],
                value: e.target.value
            }
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        let checkValidate = false

        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(validation.email.value))) {
            setValidation(prev => ({
                ...prev,
                email: {
                    ...prev.email,
                    error: true,
                    errorText: "Please enter Valid Email"
                }
            }))
            checkValidate = true
        }
        if (!validation.email.value) {
            setValidation(prev => ({
                ...prev,
                email: {
                    ...prev.email,
                    error: true,
                    errorText: "Please fill out this field"
                }
            }))
            checkValidate = true
        }

        if (!validation.password.value) {
            setValidation(prev => ({
                ...prev,
                password: {
                    ...prev.password,
                    error: true
                }
            }))
            checkValidate = true
        }
        if (validation.password.value.length >= 1 && validation.password.value.length < 6) {
            setValidation(prev => ({
                ...prev,
                password: {
                    ...prev.password,
                    error: true,
                    errorText: "Password should have atleast 6 characters"
                }
            }))
            checkValidate = true
        }
        if (!validation.name.value) {
            setValidation(prev => ({
                ...prev,
                name: {
                    ...prev.name,
                    error: true
                }
            }))
        }

        if (!checkValidate) {
            const data={
                name:validation.name.value,
                email:validation.email.value,
                password:validation.password.value
            }
            console.log(data);
          
           


            apiCalls.register(registerUrl,data,res=>{
                if(res.status){
                    localStorage.setItem("registerResponse",JSON.stringify(res.record))

                    const myLocalData=JSON.parse(localStorage.getItem("registerResponse"))
                    console.log(myLocalData,"MLD");
                    setUser([...user,myLocalData])
                    
                    console.log(user);
                    navigate('/dashboard')
                }
            })
              alert("your form has submitted successfully")
        }
     
    }
    return (
        <div className="container d-flex align-items-center">
            <div className="w-50">
        <div className='form_wrapper'>
            <div className="txt">
                <h1>SIGN UP</h1>
                <p>Sign Up! and be the part of our growing family.</p>
            </div>
            <div className="form">
                <form action="" onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className='input_style'
                            name="name"
                            onChange={onChangeHandler}/> {validation.name.error && <p className='errorText'>{validation.name.errorText}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className='input_style'
                            name="email"
                            onChange={onChangeHandler}/> {validation.email.error && <p className='errorText'>{validation.email.errorText}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className='input_style'
                            name="password"
                            onChange={onChangeHandler}/> {validation.password.error && <p className='errorText'>{validation.password.errorText}</p>}
                    </div>
                    <div className="form-group">
                        <button className='button_style button-color '>Sign Up</button>
                    </div>
                </form>
                <div className="form-group">
                <GoogleLogin
                clientId="306152246568-3or6tejn732lekru2q2go4p46lu6osgg.apps.googleusercontent.com"
                render={renderProps => (
                    <button className='button_style border-dark' onClick={renderProps.onClick} disabled={renderProps.disabled}> <img src={Google}/> Sign In with Google </button>
                )}
                buttonText="Login"
                onSuccess={onSuccessWithGoogle}
                onFailure={onFailureWithGoogle}
            />
                </div>
                <div className="form-group">
                   <Link className='text-decoration-none' to='/'> <p className='underlineText'>Already have an account?
                        <span>Sign in!</span>
                    </p>
                </Link>  
                </div>
            </div>
        </div>
        </div>
        <div className="w-50">
            <Sidebg/>
        </div>
        </div>
        
        
    )
}

export default RegisterationForm