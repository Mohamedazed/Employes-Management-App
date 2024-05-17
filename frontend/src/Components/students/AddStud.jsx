import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStud() {
    const [employee, setEmployee] = useState({
        name: "",
        date_of_birth: "",
        address: "",
        class_id: "",
        image: "",
        Genre : ''
      });
      const [category, setCategory] = useState([]);
      const navigate = useNavigate()
    
      useEffect(() => {
        axios
          .get("http://localhost:3000/auth/classes")
          .then((result) => {
            if (result.data.Status) {
              setCategory(result.data.Result);
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => console.log(err));
      }, []);
    
      const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('date_of_birth', employee.date_of_birth);
        formData.append('address', employee.address);
        formData.append('image', employee.image);
        formData.append('class_id', employee.class_id);
        formData.append('Genre', employee.Genre);
    
        axios.post('http://localhost:3000/auth/add_student', formData)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/students')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
      }
    
      return (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <div className="p-3 rounded w-50 border bg-info-subtle">
            <h3 className="text-center">Add student</h3>
            <form className="row g-1" onSubmit={handleSubmit}>
              <div className="col-12">
                <label for="inputName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="inputName"
                  placeholder="Enter Name"
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  date_of_birth
                </label>
                <input
                  type="date"
                  className="form-control rounded-pill"
                  id="inputdate_of_birth4"
                  placeholder="Enter date_of_birth"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, date_of_birth: e.target.value })
                  }
                />
              </div>
              
                
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="inputAddress"
                  placeholder="1234 Main St"
                  autoComplete="off"
                  onChange={(e) =>
                    setEmployee({ ...employee, address: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label for="category" className="form-label">
                  class
                </label>
                <select name="category" id="category" className="form-select rounded-pill"
                    onChange={(e) => setEmployee({...employee, class_id: e.target.value})}>
                      <option>...</option>
                  {category.map((c) => {
                    return <option value={c.id}>{c.name}</option>;
                  })}
                </select>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label" for="inputGroupFile01">
                  Select Image
                </label>
                <input
                  type="file"
                  className="form-control rounded-pill"
                  id="inputGroupFile01"
                  name="image"
                  onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
                />
              </div>
              <div className="col-12">
                <label for="category" className="form-label">
                  Genre
                </label>
                <select name="Genre" id="Genre" className="form-select rounded-pill"
                    onChange={(e) => setEmployee({...employee, Genre: e.target.value})}>
                      <option>...</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                </select>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary mt-4 rounded-pill shadow-sm w-100">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
    
