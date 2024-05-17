import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditClass() {
    const {id} = useParams()
    const [category, setCategory] = useState({
        name: '',
        level: '',
    })
    const navigate = useNavigate()

    useEffect(()=> {
        axios.get(`http://localhost:3000/auth/class/${id}`)
        .then(res => {
            if (res.data && res.data.Result && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
                setCategory({
                    ...category,
                    name: res.data.Result[0].name, 
                    level: res.data.Result[0].level
                });
            } else {
                console.error('Invalid data structure in response:', res.data);
            }
        }).catch(err => console.log(err))
    }, [id])
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_class/'+id, category)
        .then(res => {
            console.log(res.data);
            navigate('/dashboard/classes');
          })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border bg-info-subtle'>
            <h2>edit classe</h2>
            {category !== null ? (
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                    <label><strong>class name:</strong></label>
                    <input type="text" name='name' value={category.name} id='name'
                     onChange={handleChange} className='form-control rounded-pill' required/>
                </div>
                <div className='form-group mb-3'>
                    <label>level</label>
                    <input type='text' className='form-control rounded-pill' id='created_date' name='level' value={category.level}  onChange={e=>setCategory({...category, level: e.target.value})} required />
                </div>
                <button className='btn btn-success rounded-pill shadow-sm w-100 rounded-0 mb-2'>Edit Category</button>
                <Link to={`/dashboard/classes`} className='btn btn-secondary rounded-pill w-100 shadow-sm '>Cancel</Link>
            </form> ) : (
                <p>No data available for this class.</p>
                )}
        </div>
    </div>
  )
}

