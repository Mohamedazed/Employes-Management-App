// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import './profile.css'

// const Profile = () => {
//   const [admin, setAdmin] = useState({
//     image: '',
//     name: '',
//   });
//     const {id} = useParams()
//     const navigate = useNavigate()
//     const [click,setClick] = useState(false)

//     useEffect(() => {
//       axios.get(`http://localhost:3000/auth/admin/${id}`)
//       .then(res => {
//         if (res.data && res.data.Result && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
//           setAdmin({
//                 ...admin,
//                 name: res.data.Result[0].name, 
//                 image: res.data.Result[0].image
//             });console.log(admin)
//         } else {
//             console.error('Invalid data structure in response:', res.data);
//         }
//         }).catch(err => console.log(err))
//     }, [id])

//     const handleChange = e => {
//       const { name, value } = e.target;
//       setAdmin(prevState => ({
//         ...prevState,
//         [name]: value,
//       }));
//     };

//     const handleFileChange = (e) => {
//       const file = e.target.files[0];
//       setAdmin(prevState => ({
//           ...prevState,
//           image: file
//       }));
//     };
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append('name', admin.name);
//       formData.append('image', admin.image);
//       axios.put('http://localhost:3000/auth/admin/edit/' + id, formData)
//         .then(result => {
//           console.log(result.data);
//           navigate('/dashboard/profile/' + id);
//         })
//         .catch(err => console.log(err));
//     };

//     const handleEditClick = () => {
//       setClick(prevState => !prevState);
//     };

//   return (
//     <div className="profile-container">
//       <div className="profile-background">
//           <div className='div mb-5'>
//             <img src='/public/Images/employeems.jpeg' className='Bigimg'/>
//             <img src={`http://localhost:3000/Images/${admin.image}`} alt={admin.name} className='profile-image border border-dark'/>
          
//           </div>
//           <h1 className="profile-name ">{admin.name}</h1>
//         <p className="profile-description">Software Engineer</p>
//         <button className='btn btn-info' onClick={handleEditClick}>Edit</button>
//        {click ? (
//           <form onSubmit={handleSubmit}>
//             Name: <input
//               type="text"
//               name="name"
//               value={admin.name}
//               onChange={handleChange}
//             />
//             <input
//               type="file"
//               name="image"
//               onChange={(e) => setAdmin({...admin, image: e.target.files[0]})}
//               placeholder="Enter Image URL"
//             />
//             <button type="submit" className="btn btn-info">
//               Save
//             </button>
//           </form>
          
//         ):null
//       }
//        </div>
//     </div>
//   )
// }

// export default Profile


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './profile.css';
import EditModalProfil from './EditModalProfil';

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    image: '',
    name: '',
    email: ''
  });
  const [values, setValues] = useState({
    name: '',
    image: '',
    oldPassword: '',
    newPassword1: '',
    newPassword2: ''
  });
  const [isEdItModalOpen, setEdItModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/admin/${id}`)
      .then(res => {
        if (res.data && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
          const adminData = res.data.Result[0];console.log(adminData)
          setAdmin({
            name: adminData.name,
            image: adminData.image,
            email: adminData.email
          });
          setValues({ 
            name: adminData.name, 
            image: adminData.image ,
            oldPassword: adminData.password
          });
        } else {
          console.error('No admin data found for the given ID:', id);
        }
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);
    axios.put(`http://localhost:3000/auth/admin/edit/${id}`, formData)
      .then(result => {
        console.log(result.data);
        navigate(`/dashboard/profile/${id}`);
      })
      .catch(err => console.log(err));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword1, newPassword2 } = values;

    axios.put(`http://localhost:3000/auth/admin/edit/password/${id}`, {
        oldPassword,
        newPassword1,
        newPassword2
    })
    .then(result => {
        console.log(result.data);
        navigate(`/dashboard/profile/${id}`);
    })
    .catch(err => console.log(err));
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const closeEditModal = () => {
    setEdItModalOpen(false);
  };

  return (
    <div className='container mt-5 mb-4'>
      {isEdItModalOpen && <EditModalProfil isOpen={isEdItModalOpen} onClose={closeEditModal} values={values} handleChange={handleChange} handleSubmit={handleSubmit} />}
      <div className=' border shadow m-5'>
        <div className="profile-container ">
          <div className="profile-background ">
            <div className='div m-4'>
              <img src='/public/Images/fbg.avif' className='Bigimg' alt='Big image' />
              <img src={`http://localhost:3000/Images/${admin.image}`} alt={admin.name} className='profile-image border border-dark' />
            </div>
          </div>
        </div>

        <div className='text-center border shadow bg-info-subtle ms-5 mb-5 me-5 p-2' style={{marginTop : '-20%'}}>
              <h4 className=''>Personal Details</h4>
              <p className="profile-name me-5"><span className='me-3'>Name:</span> {admin.name}</p>
              <p className="profile-description ms-5"><span className='me-3'>Email ID:</span> {admin.email}</p>
        </div>

        <div className='row  ms-5 mb-5 mt-2 ' style={{ marginTop: '-20%' }}>
          <div className='col-sm-5 shadow bg-info-subtle py-4 mb-4'>
          <h4 className='text-center'>Edit personal infos</h4>
          <form onSubmit={handleSubmit} className='mt-5'>
            <div className='modify-infos'>
              <div className='form-group mb-3'>
                <label>Name :</label>
                <input type='text' className='form-control rounded-pill' id='name' name='name' value={values?.name || ''} onChange={handleChange} required />
              </div>
              <div className="form-group mb-3">
                <label>Select Image :</label>
                <input type="file" name="image" onChange={(e) => setValues(prevState => ({ ...prevState, image: e.target.files[0] }))} className="form-control rounded-pill" />
              </div>
              <button type="submit" className='btn bg-primary-subtle form-control mt-4 rounded-pill shadow-sm'>Update Infos</button>
              </div>
              </form>
          </div>

          <div className='col-sm-6 shadow bg-info-subtle ms-2 py-4 mb-4'>

            <form onSubmit={handlePasswordSubmit}>
            <h4 className='text-center'>Edit password</h4>
              <div className='modify-pass'>
              <div className='form-group mb-3'>
                <label>Old password :</label>
                <input type='password' className='form-control rounded-pill' id='oldPassword' name='oldPassword' value={values.oldPassword} onChange={handlePasswordChange} required />
              </div>
              <div className='form-group mb-3'>
                <label>New password :</label>
                <input type='password' className='form-control rounded-pill' id='newPassword1' name='newPassword1' value={values.newPassword1} onChange={handlePasswordChange} required />
              </div>
              <div className='form-group mb-3'>
                <label>Confirm new password :</label>
                <input type='password' className='form-control rounded-pill' id='newPassword2' name='newPassword2' value={values.newPassword2} onChange={handlePasswordChange} required />
              </div>
              <button type="submit" className='btn bg-primary-subtle form-control rounded-pill shadow-sm'>Update Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
