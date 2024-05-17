import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditCat() {
    const {id} = useParams()
    const [category, setCategory] = useState({
        name: '',
        created_date: '',
    })
    const navigate = useNavigate()

    useEffect(()=> {
        axios.get(`http://localhost:3000/auth/category/${id}`)
        .then(res => {
            if (res.data && res.data.Result && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
                setCategory({
                    ...category,
                    name: res.data.Result[0].name, 
                    created_date: res.data.Result[0].created_date
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
        axios.put('http://localhost:3000/auth/edit_category/'+id, category)
        .then(res => {
            console.log(res.data);
            navigate('/dashboard/category');
          })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-50 border bg-info-subtle'>
            <h2 className='mb-4 text-center'>Edit Category</h2>
            {category !== null ? (
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                    <label><strong>Category name:</strong></label>
                    <input type="text" name='name' value={category.name} id='name'
                     onChange={handleChange} className='form-control rounded-pill' required/>
                </div>
                <div className='form-group mb-3'>
                    <label><strong>Created Date</strong></label>
                    <input type='text' className='form-control rounded-pill' id='created_date' name='created_date' value={category.created_date}  onChange={e=>setCategory({...category, created_date: e.target.value})} readOnly />
                </div>
                <button className='btn btn-primary w-100 rounded-pill shadow-sm mb-2'>Edit Category</button>
                <Link to={`/dashboard/category`} className='btn btn-secondary w-100 rounded-pill shadow-sm '>Cancel</Link>
            </form> ) : (
                <p>No data available for this category.</p>
                )}
        </div>
    </div>
  )
}
