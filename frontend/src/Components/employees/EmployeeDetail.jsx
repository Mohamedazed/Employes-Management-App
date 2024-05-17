import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const [categories, setCategories] = useState([]);
    const [classes, setClasses] = useState([]);
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))

        axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

      axios
      .get("http://localhost:3000/auth/classes")
      .then((result) => {
        if (result.data.Status) {
          setClasses(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }
        }).catch(err => console.log(err))
      }

      const getClassById = (classId) => {
        return classes.find(cls => cls.id === classId)?.name || '';
      };

  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <Link to={`/employee_detail/${id}`} className=' rounded-pill'>
                <img src="/Images/adgham2.jpg" className="rounded"  alt="Logo" />
            </Link>
        </div>
        
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image '/>
            <div>
                <Link to={`/ListClasses/${employee.id}`} className='btn btn-primary rounded-pill shadow-sm me-2'><i class="bi bi-easel"></i> Classe</Link>
                <button className='btn btn-danger rounded-pill shadow-sm' onClick={handleLogout}><i className="bi bi-power"></i> Logout</button>
            </div>
            <div className='d-flex justify-content-between  mt-5'>
                <div className='me-4 mb-4 border border-primary bg-info-subtle p-4 shadow-sm rounded'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Address: {employee.address}</h3>
                </div>
                <div className='ms-4 mb-4 border border-primary bg-info-subtle p-4 shadow-sm rounded'>
                    <h3>Category: {categories.find(category => category.id === employee.category_id)?.name}</h3>
                    <h3>Class: {employee.classes}</h3>
                    <h3>Salary: {employee.salary}DH</h3>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default EmployeeDetail