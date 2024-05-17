// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AddEmployee = () => {
//   const [employee, setEmployee] = useState({
//     name: "",
//     email: "",
//     password: "",
//     salary: "",
//     address: "",
//     category_id: "",
//     image: "",
//     IDclass: "",
//   });
//   const [category, setCategory] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const navigate = useNavigate()

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/category")
//       .then((result) => {
//         if (result.data.Status) {
//           setCategory(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//       axios
//       .get("http://localhost:3000/auth/classes")
//       .then((result) => {
//         if (result.data.Status) {
//           setClasses(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const formData = new FormData();
//     formData.append('name', employee.name);
//     formData.append('email', employee.email);
//     formData.append('password', employee.password);
//     formData.append('address', employee.address);
//     formData.append('salary', employee.salary);
//     formData.append('image', employee.image);
//     formData.append('category_id', employee.category_id);
//     formData.append("IDclass", employee.IDclass);

//     axios.post('http://localhost:3000/auth/add_employee', formData)
//     .then(result => {
//         if(result.data.Status) {
//             navigate('/dashboard/employee')
//         } else {
//             alert(result.data.Error)
//         }
//     })
//     .catch(err => console.log(err))
//   }

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-3">
//       <div className="p-3 rounded w-50 border bg-info-subtle mb-4">
//         <h3 className="text-center">Add Employee</h3>
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
//               onChange={(e) =>
//                 setEmployee({ ...employee, email: e.target.value })
//               }
//             />
//           </div>
//           <div className="col-12">
//             <label for="inputPassword4" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control rounded-pill"
//               id="inputPassword4"
//               placeholder="Enter Password"
//               onChange={(e) =>
//                 setEmployee({ ...employee, password: e.target.value })
//               }
//             />
//             <label for="inputSalary" className="form-label">
//               Salary
//             </label>
//             <input
//               type="text"
//               className="form-control rounded-pill"
//               id="inputSalary"
//               placeholder="Enter Salary"
//               autoComplete="off"
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
//                   <option value=''>...</option>
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
//               Add Employee
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    classes: [], // Change to array for multiple classes
    image: "",
  });
  const [category, setCategory] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
      axios
      .get("http://localhost:3000/auth/classes")
      .then((result) => {
        if (result.data.Status) {
          const options = result.data.Result.map(cls => ({
            value: cls.name,
            label: cls.name
        }));
          setClasses(options);
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
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);
    formData.append("classes", employee.classes.map(cls => cls.value).join(',')); // Join selected classes

    axios.post('http://localhost:3000/auth/add_employee', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border bg-info-subtle mb-4">
        <h3 className="text-center">Add Employee</h3>
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
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-pill"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
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
              Category
            </label>
            <select name="category" id="category" className="form-select rounded-pill "
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
                  <option value=''>...</option>
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="classes" className="form-label rounded-pill">Classes</label>
            <Select
              isMulti
              options={classes}
              value={employee.classes}
              onChange={(selectedOptions) => setEmployee({ ...employee, classes: selectedOptions })}
              placeholder="Select Classes..."
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
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
            <button type="submit" className="btn btn-primary rounded-pill shadow-sm w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
