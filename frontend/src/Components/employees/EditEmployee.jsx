// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'

// const EditEmployee = () => {
//     const {id} = useParams()
//     const [employee, setEmployee] = useState({
//         name: "",
//         email: "",
//         salary: "",
//         address: "",
//         category_id: "",
//         IDclass : '',
//         image: null,
//       });
//       const [category, setCategory] = useState([])
//       const [classes, setClasses] = useState([]);
//       const navigate = useNavigate()

//       useEffect(()=> {
//         axios.get('http://localhost:3000/auth/category')
//         .then(result => {
//             if(result.data.Status) {
//                 setCategory(result.data.Result);
//             } else {
//                 alert(result.data.Error)
//             }
//         }).catch(err => console.log(err))

//         axios
//       .get("http://localhost:3000/auth/classes")
//       .then((result) => {
//         if (result.data.Status) {
//           setClasses(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));

//         axios.get('http://localhost:3000/auth/employee/'+id)
//         .then(result => {
//             setEmployee({
//                 ...employee,
//                 name: result.data.Result[0].name,
//                 email: result.data.Result[0].email,
//                 address: result.data.Result[0].address,
//                 salary: result.data.Result[0].salary,
//                 category_id: result.data.Result[0].category_id,
//                 IDclass: result.data.Result[0].IDclass,
//                 image: result.data.Result[0].image
//             })
//         }).catch(err => console.log(err))
//     }, [])

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append('name', employee.name);
//       formData.append('email', employee.email);
//       formData.append('salary', employee.salary);
//       formData.append('address', employee.address);
//       formData.append('category_id', employee.category_id);
//       formData.append('IDclass', employee.IDclass);
//       formData.append('image', employee.image); // Append the image file
  
//       axios.put(`http://localhost:3000/auth/edit_employee/${id}`, formData)
//       .then(result => {
//           if(result.data.Status) {
//               navigate('/dashboard/employee');
//           } else {
//               alert(result.data.Error);
//           }
//       }).catch(err => console.log(err));
//   };
  
    
//   return (
//     <div className="d-flex justify-content-center align-items-center mt-3">
//       <div className="p-3 rounded w-50 border bg-info-subtle mb-3">
//         <h3 className="text-center">Edit Employee</h3>
//         <form className="row g-1" onSubmit={handleSubmit}>
//           <div className="col-12">
//             <label for="inputName" className="form-label">
//               Name
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-pill"
//               id="inputName"
//               placeholder="Enter Name"
//               value={employee.name}
//               onChange={(e) =>
//                 setEmployee({ ...employee, name: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label for="inputEmail4" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               className="form-control rounded-pill"
//               id="inputEmail4"
//               placeholder="Enter Email"
//               autoComplete="off"
//               value={employee.email}
//               onChange={(e) =>
//                 setEmployee({ ...employee, email: e.target.value })
//               }
//             />
//           </div>
//           <div className='col-12'>
//             <label for="inputSalary" className="form-label">
//               Salary
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-pill"
//               id="inputSalary"
//               placeholder="Enter Salary"
//               autoComplete="off"
//               value={employee.salary}
//               onChange={(e) =>
//                 setEmployee({ ...employee, salary: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label for="inputAddress" className="form-label">
//               Address
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-pill"
//               id="inputAddress"
//               placeholder="1234 Main St"
//               autoComplete="off"
//               value={employee.address}
//               onChange={(e) =>
//                 setEmployee({ ...employee, address: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label for="category" className="form-label">
//               Category
//             </label>
//             <select name="category" id="category" className="form-select rounded-pill "
//                 onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
//               <option>...</option>
//               {category.map((c) => {
//                 return <option value={c.id}>{c.name}</option>;
//               })}
//             </select>
//           </div>
//           <div className="col-12">
//             <label htmlFor="class" className="form-label">
//               Class
//             </label>
//             <select
//               name="class"
//               id="class"
//               className="form-select rounded-pill"
//               onChange={(e) => setEmployee({ ...employee, IDclass: e.target.value })}
//             >
//               <option value=''>Select Class</option>
//               {classes.map((cls) => (
//                 <option key={cls.id} value={cls.id}>
//                   {cls.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-12 mb-3">
//             <label className="form-label" for="inputGroupFile01">
//               Select Image
//             </label>
//             <input
//               type="file"
//               className="form-control rounded-pill"
//               id="inputGroupFile01"
//               name="image"
//               onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
//             />
//           </div>
          
//           <div className="col-12">
//             <button type="submit" className="btn btn-primary rounded-pill shadow-sm w-100">
//               Edit Employee
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default EditEmployee


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
        classes: [],
        image: null,
    });
    const [category, setCategory] = useState([]);
    const [classesOptions, setClassesOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

        axios
            .get("http://localhost:3000/auth/classes")
            .then((result) => {
                if (result.data.Status) {
                    const options = result.data.Result.map(cls => ({
                        value: cls.name,
                        label: cls.name
                    }));
                    setClassesOptions(options);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
        axios.get(`http://localhost:3000/auth/employee/${id}`)
            .then(result => {
                const { name, email, salary, address, category_id, classes, image } = result.data.Result[0];
                setEmployee({
                    ...employee,
                    name,
                    email,
                    salary,
                    address,
                    category_id,
                    classes,
                    image
                });
            }).catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('salary', employee.salary);
        formData.append('address', employee.address);
        formData.append('category_id', employee.category_id);
        formData.append('classes', employee.classes.map(cls => cls.value).join(','));
        formData.append('image', employee.image);

        axios.put(`http://localhost:3000/auth/edit_employee/${id}`, formData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee');
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    };

    const handleSelect = (selectedOptions) => {
        setEmployee({ ...employee, classes: selectedOptions });
    };
            console.log(classesOptions)
    console.log(employee)

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border bg-info-subtle mb-3">
                <h3 className="text-center">Edit Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="inputName"
                            placeholder="Enter Name"
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-pill"
                            id="inputEmail"
                            placeholder="Enter Email"
                            value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputSalary" className="form-label">Salary</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            value={employee.salary}
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control rounded-pill"
                            id="inputAddress"
                            placeholder="Enter Address"
                            value={employee.address}
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="form-select rounded-pill"
                            value={employee.category_id}
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {category.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="classes" className="form-label rounded-pill">Classes</label>
                        <Select
                            isMulti
                            options={classesOptions}
                            value={employee.classes}
                            onChange={handleSelect}
                            placeholder="Select Classes..."
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputImage" className="form-label">Image</label>
                        <input
                            type="file"
                            className="form-control rounded-pill"
                            id="inputImage"
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary rounded-pill shadow-sm w-100">Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
