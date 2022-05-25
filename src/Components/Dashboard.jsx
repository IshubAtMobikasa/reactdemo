import React, { useState,useEffect } from 'react'
import { GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const localStorageDataGoogleLogIn=JSON.parse(localStorage.getItem("data"))
    const localStorageDataAPI=JSON.parse(localStorage.getItem("registerResponse"))
    useEffect(() => {

        localStorageDataGoogleLogIn? setData([...data,localStorageDataGoogleLogIn]) :setData([...data,localStorageDataAPI])
    
    }, [])
    console.log(data);

    const logOutHandler=()=>{
        localStorage.clear()
        navigate('/')
    }
  return (
    <div>
        {
            localStorageDataGoogleLogIn?<>{
                data.map((data,i)=>(
              
            <div key={i}>
                   
                    <img src={data.profileObj.imageUrl} alt="" className='profile'/>
                    <h3>
                        {
                            data.profileObj.name
                        }
                    </h3>
                    <h3>
                        {
                            data.profileObj.email
                        }
                    </h3>
            
                                    
                            
            
            </div>
                        
                 
                ))
            }</>
            :
            <>
            {
                // console.log(data)
                data.map(everys=>(
                    <div key={everys.id}>
                        <h1>{everys.name}</h1>
                        <h3>{everys.email}</h3>
       
                    </div>
                ))
            }
            </>
        }

    <GoogleLogout
      clientId="306152246568-3or6tejn732lekru2q2go4p46lu6osgg.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logOutHandler}
    >
    </GoogleLogout>
    </div>
  )
}

export default Dashboard