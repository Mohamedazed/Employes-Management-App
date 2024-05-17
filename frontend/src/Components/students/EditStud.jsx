import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStud() {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        date_of_birth: '',
        image: null,
        address: '',
        class_id: '',
        Genre: ''
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/classes')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:3000/auth/students/' + id)
            .then(result => {
                const { name, date_of_birth, address, image, class_id, Genre } = result.data.Result[0];
                setEmployee({
                    name,
                    date_of_birth,
                    address,
                    image: null, 
                    class_id,
                    Genre
                });
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('date_of_birth', employee.date_of_birth);
        formData.append('address', employee.address);
        formData.append('class_id', employee.class_id);
        formData.append('Genre', employee.Genre);
        if (employee.image) {
            formData.append('image', employee.image[0]); // Append the first file from the FileList
        }

        axios.put('http://localhost:3000/auth/edit_students/' + id, formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/students');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border bg-info-subtle">
                <h3 className="text-center">Edit student</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Enter Name"
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">date_of_birth</label>
                        <input
                            type="date"
                            className="form-control rounded-pill"
                            placeholder="Enter date"
                            value={employee.date_of_birth}
                            onChange={(e) => setEmployee({ ...employee, date_of_birth: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label className="form-label">image</label>
                        <input
                            type="file"
                            className="form-control rounded-pill"
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files })}
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            value={employee.address}
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label for="category" className="form-label">class</label>
                        <select
                            name="category"
                            id="category"
                            className="form-select rounded-pill"
                            onChange={(e) => setEmployee({ ...employee, class_id: e.target.value })}
                        >
                            {category.map((c) => {
                                return <option key={c.id} value={c.id}>{c.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-12">
                        <label for="category" className="form-label">Genre</label>
                        <select
                            name="Genre"
                            id="Genre"
                            className="form-select rounded-pill"
                            onChange={(e) => setEmployee({ ...employee, Genre: e.target.value })}
                        >
                            <option>...</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary mt-4 rounded-pill shadow-sm w-100">Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
