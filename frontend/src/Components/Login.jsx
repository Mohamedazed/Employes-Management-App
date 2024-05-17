import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {console.log(values)
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error && error}
            </div>
            <h2 className='mb-3 text-center'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email" className='mb-1'><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                     onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-pill'/>
                </div>
                <div className='mb-3'> 
                    <label htmlFor="password" className='mb-1'><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-pill'/>
                </div>
                <button className='btn btn-success w-100 rounded-pill mb-2'>Log in</button>
                {/* <div className='mb-1'> 
                    <input type="checkbox" name="tick" id="tick" className='me-2'/>
                    <label htmlFor="password">You are Agree with terms & conditions</label>
                </div> */}
            </form>
            <p>You don't have a account? Plaise signup her <Link to='/signup'>Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Login