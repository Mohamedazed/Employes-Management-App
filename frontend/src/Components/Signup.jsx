import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('image', values.image);
    
    axios.post('http://localhost:3000/auth/adminsignup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(result => {
      if (result.data.signupStatus) {
        console.log('Signup successful');
        navigate('/adminlogin');
      } else {
        setError(result.data.error);
      }
    })
    .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setValues(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-25 border loginForm'>
      <h2 className='mb-2 text-center'>Signup</h2>
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className='mb-1'><strong>Name:</strong></label>
          <input type="text" id="name" name="name" value={values.name} placeholder='Enter Name' onChange={handleChange} className="form-control rounded-pill" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className='mb-1'><strong>Email:</strong></label>
          <input type="email" id="email" name="email" value={values.email} placeholder='Enter Email' onChange={handleChange} className="form-control rounded-pill" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className='mb-1'><strong>Password:</strong></label>
          <input type="password" id="password" name="password" value={values.password} placeholder='Enter Password' onChange={handleChange} className="form-control rounded-pill" />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className='mb-1'><strong>Image:</strong></label>
          <input type="file" id="image" name="image" onChange={handleImageChange} placeholder='Select Image' className="form-control rounded-pill" />
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-pill mb-2">Signup</button>
      </form>
      <p>I have already a account <Link to='/adminlogin'>Login In</Link></p>
      </div>
    </div>
  );
}
