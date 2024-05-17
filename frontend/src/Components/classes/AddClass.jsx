import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddClass() {
    const [clas, setClas] = useState({
        name:'',
        level:''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/add_class', clas)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/classes');
            } else {
                alert(result.data.Error);
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 rounded w-50 shadow border bg-info-subtle '>
                <h2>Add class</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Class:</strong></label>
                        <input type="text" name='name' placeholder='Enter class name'
                         value={clas.name} onChange={(e) => setClas({...clas, name:e.target.value})} className='form-control rounded-pill '/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Level:</strong></label>
                        <input type="text" name='level' placeholder='Enter level'
                         value={clas.level} onChange={(e) =>  setClas({...clas, level:e.target.value})} className='form-control rounded-pill'/>
                    </div>
                    <button type="submit" className='btn btn-primary w-100 rounded-pill shadow-sm mb-2'>Add class</button>
                </form>
            </div>
        </div>
    );
}
