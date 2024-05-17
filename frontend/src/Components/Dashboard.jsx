// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [currentAdminId, setCurrentAdminId] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/current_admin_id")
//       .then((result) => {
//         setCurrentAdminId(result.data.id);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleLogout = () => {
//     axios.get("http://localhost:3000/auth/logout").then((result) => {
//       if (result.data.Status) {
//         localStorage.removeItem("valid");
//         navigate("/");
//       }
//     });
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row flex-nowrap">
//         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-danger">
//           <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//             <Link
//               to="/dashboard"
//               className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
//             >
//               <span className="fs-5 fw-bolder d-none d-sm-inline">
//                 <img
//                   src="public/Images/adgham.jpg"
//                   width="185px"
//                   className="border border-dark"
//                 />
//               </span>
//             </Link>
//             <hr />
//             <ul
//               className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//               id="menu"
//             >
//               <li className="w-100">
//                 <Link
//                   to="/dashboard"
//                   className="nav-link text-white px-0 align-middle"
//                 >
//                   <i className="fs-4 bi-speedometer2 ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Dashboard</span>
//                 </Link>
//               </li>
//               <li className="w-100">
//                 <Link
//                   to="/dashboard/employee"
//                   className="nav-link px-0 align-middle text-white"
//                 >
//                   <i className="fs-4 bi-people ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">
//                     Manage Employees
//                   </span>
//                 </Link>
//               </li>
//               <li className="w-100">
//                 <Link
//                   to="/dashboard/category"
//                   className="nav-link px-0 align-middle text-white"
//                 >
//                   <i className="fs-4 bi-columns ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Category</span>
//                 </Link>
//               </li>
//               <li className="w-100">
//                 <Link
//                   to={`/dashboard/profile/${currentAdminId}`} 
//                   className="nav-link px-0 align-middle text-white"
//                 >
//                   <i className="fs-4 bi-person ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Profile</span>
//                 </Link>
//               </li>
//               <li className="w-100">
//                 <Link
//                   to={`/dashboard/profile/edit/${currentAdminId}`} 
//                   className="nav-link px-0 align-middle text-white"
//                 >
//                   <i className="fs-4 bi-person ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline"> Edit Profile</span>
//                 </Link>
//               </li>
//               <li className="w-100" onClick={handleLogout}>
//                 <Link className="nav-link px-0 align-middle text-white">
//                   <i className="fs-4 bi-power ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Logout</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="col p-0 m-0">
//           <div className="p-2 d-flex justify-content-center bg-danger-subtle shadow">
//             <h4>Employee Management System</h4>
//           </div>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { Link, Outlet, useNavigate} from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [admin, setAdmin] = useState({
//     image: '',
//     name: '',
//   });
//   const [currentAdminId, setCurrentAdminId] = useState(null); 

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/current_admin_id")
//       .then((result) => {
//         setCurrentAdminId(result.data.id);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleLogout = () => {
//     axios.get("http://localhost:3000/auth/logout").then((result) => {
//       if (result.data.Status) {
//         localStorage.removeItem("valid");
//         navigate("/");
//       }
//     });
//   };

//   useEffect(() => {
//     axios.get(`http://localhost:3000/auth/admin/${currentAdminId}`)
//       .then(res => {
//         if (res.data && Array.isArray(res.data.Result) && res.data.Result.length > 0) {
//           setAdmin({
//             name: res.data.Result[0].name,
//             image: res.data.Result[0].image,
//           });
//         } else {
//           console.error('No admin data found for the given ID:', currentAdminId);
//         }
//       })
//       .catch(err => console.log(err));
//   }, [currentAdminId]);
  
//   return (
//     <div className="container-fluid">
//       <div className="row flex-nowrap">
//         <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-danger-subtle ">
//           <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100">
//             <Link
//               to="/dashboard"
//               className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-dark text-decoration-none"
//             >
//               <span className="fs-5 fw-bolder d-none d-sm-inline">
//                 <img
//                   src="/Images/adgham1.png"
//                   width="185px"
//                 /><hr/>
                
//               </span>
//             </Link>
//             <Link to={`/dashboard/profile/${currentAdminId}`}  className="d-flex align-items-center pb-3 text-dark text-decoration-none">
//               <div style={{marginLeft:'20%'}} >
//                 <img src={`http://localhost:3000/Images/${admin.image}`} alt={admin.name} className="border border-dark" style={{backgroundColor:' rgb(247, 185, 198)',width: '110px',height: '110px',borderRadius: '50%'}} />
//                 <h3 style={{marginTop :'6%'}}>{admin.name}</h3>
//                 <Link
//                   to={`/dashboard/profile/edit/${currentAdminId}`} 
//                   className="nav-link px-0 align-middle text-dark"
//                 >
//                   <span className="ms-2 d-none d-sm-inline btn btn-outline-danger bg-danger-subtle"> Edit Profile</span>
//                 </Link>
//               </div>
//             </Link><hr/>
//             <ul
//               className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
//               id="menu"
//             >
//               <li className="w-100">
//                 <Link
//                   to="/dashboard"
//                   className="nav-link text-dark px-0 align-middle"
//                 >
//                   <i className="fs-4 bi-speedometer2 ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Dashboard</span>
//                 </Link>
//               </li>
//               <li className="w-100">
//                 <Link
//                   to="/dashboard/employee"
//                   className="nav-link px-0 align-middle text-dark"
//                 >
//                   <i className="fs-4 bi-people ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">
//                     Manage Employees
//                   </span>
//                 </Link>
//               </li>
//               <li className="w-100">
//                 <Link
//                   to="/dashboard/category"
//                   className="nav-link px-0 align-middle text-dark"
//                 >
//                   <i className="fs-4 bi-columns ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Category</span>
//                 </Link>
//               </li>
//               <li className="w-100">
//                 <Link
//                   to={`/dashboard/profile/${currentAdminId}`} 
//                   className="nav-link px-0 align-middle text-dark"
//                 >
//                   <i className="fs-4 bi-person ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Profile</span>
//                 </Link>
//               </li>
//               <li className="w-100" onClick={handleLogout}>
//                 <Link className="nav-link px-0 align-middle text-dark">
//                   <i className="fs-4 bi-power ms-2"></i>
//                   <span className="ms-2 d-none d-sm-inline">Logout</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="col p-0 m-0">
//           <div className="p-2 d-flex justify-content-center bg-danger-subtle shadow">
//             <h4>Employee Management System</h4>
//           </div>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    image: "",
    name: "",
  });
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/current_admin_id")
      .then((result) => {
        setCurrentAdminId(result.data.id);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/admin/${currentAdminId}`)
      .then((res) => {
        if (
          res.data &&
          Array.isArray(res.data.Result) &&
          res.data.Result.length > 0
        ) {
          setAdmin({
            name: res.data.Result[0].name,
            image: res.data.Result[0].image,
          });
        } else {
          console.error(
            "No admin data found for the given ID:",
            currentAdminId
          );
        }
      })
      .catch((err) => console.log(err));
  }, [currentAdminId]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function isSelected(path) {
    return window.location.pathname === path;
  }

  // const handleSearch = () => {
  //   axios
  //     .get(`http://localhost:3000/auth/category/search?name=${searchQuery}`)
  //     .then((response) => {
  //       setSearchResults(response.data.result);
  //     })
  //     .catch((error) => {
  //       console.error("Error searching categories:", error);
  //     });
  // };

  const handleSearch = () => {
    let searchEndpoint = ""; // Initialize the search endpoint
    
    // Determine the search endpoint based on the current selected page
    switch (window.location.pathname) {
      case "/dashboard":
        searchEndpoint = "http://localhost:3000/auth/category/search";
        break;
      case "/dashboard/students":
        searchEndpoint = "http://localhost:3000/auth/students/search";
        break;
      case "/dashboard/classes":
        searchEndpoint = "http://localhost:3000/auth/class/search";
        break;
      case "/dashboard/employee":
        searchEndpoint = "http://localhost:3000/auth/employee/search";
        break;
      default:
        // Handle other cases or set a default search endpoint
        break;
    }
  
    // Make the API call to search based on the determined endpoint
    axios
      .get(`${searchEndpoint}?name=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data.result);
      })
      .catch((error) => {
        console.error("Error searching:", error);
      });
  };

  
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg shadow " >
          
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-dark min-vh-100 hidder">
            {/* Sidebar Header */}
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-dark text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline d-flex">
                
                <img src="/Images/adgham3.png" width="160px" height='70px' alt="Logo" />
                <hr />
              </span>
            </Link>


            {/* Sidebar Menu */}
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className={`w-100 pe-5 ${isSelected('/dashboard') && 'selected'}`}>
                <Link to="/dashboard" className="nav-link text-dark px-0 align-middle" >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              <li className={`w-100 pe-5 ${isSelected('/dashboard/students') && 'selected'}`}>
                <Link to="/dashboard/students" className="nav-link px-0 align-middle text-dark">
                  <i className="fs-4 bi-backpack3 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Students</span>
                </Link>
              </li>
              <li className={`w-100 pe-5 ${isSelected('/dashboard/classes') && 'selected'}`}>
                <Link to="/dashboard/classes" className="nav-link px-0 align-middle text-dark">
                <i class="fs-4 bi-easel ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Classes</span>
                </Link>
              </li>

              <li className={`w-100 pe-5 ${isSelected('/dashboard/employee') && 'selected'}`}>
                <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-dark">
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Teachers</span>
                </Link>
              </li>
              <li className={`w-100 pe-5 ${isSelected('/dashboard/category') && 'selected'}`}>
                <Link to="/dashboard/category" className="nav-link px-0 align-middle text-dark">
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className={`w-100 pe-5 ${isSelected(`/dashboard/profile/${currentAdminId}`) && 'selected'}`}>
                <Link to={`/dashboard/profile/${currentAdminId}`} className="nav-link px-0 align-middle text-dark">
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100 pe-5 mt-5" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-dark">
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div> )}

        {/* Main Content */}
        <div className="col p-0 m-0 ">
        <div className="p-2 d-flex shadow-sm" style={{backgroundColor: 'rgb(72, 198, 230)'}}>
          <button 
            className="btn btn-outline-dark rounded-circle pb-2"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (<i className="bi bi-x-lg"></i>) : (<i className="bi bi-list"></i>)}
          </button>
          
          {/* Search Field */}
          <div className="input-group me-5 d-flex justify-centent-center " style={{marginRight: '300px',marginLeft: '410px', width: '500px'}} >
          <img src="/Images/adgham2.jpg" className="rounded"  alt="Logo" />
        {/* <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary me-5"
          type="button"
          onClick={handleSearch}
        >
          <i className="bi bi-search"></i>
        </button> */}
      </div>
      
          {/* Profile Icon */}
          <Link to={`/dashboard/profile/${currentAdminId}`} className="text-decoration-none mt-2 me-0" style={{marginLeft : '26%',marginRight : '0%' }}>
            <img src={`http://localhost:3000/Images/${admin.image}`} width='40px' className='img rounded-circle' alt={admin.name} />
          </Link>
        </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;