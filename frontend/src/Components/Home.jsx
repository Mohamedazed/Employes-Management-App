import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [classTotal, setClassTotal] = useState(0);
  const [employeeTotal, setemployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [classData, setClassData] = useState([]);
  const [employeeCounts, setEmployeeCounts] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    fetchCurrentUser();
    fetchClassData();
    fetchStudentGenderStatistics();
    fetchEmployeeCountsByCategory();
  }, []);

  const fetchClassData = () => {
    axios.get('http://localhost:3000/auth/classes')
        .then(result => {
            if (result.data.Status) {
                setClassData(result.data.Result);
                renderClassAnalysisChart(result.data.Result);
            } else {
                alert(result.data.Error);
            }
        })
        .catch(error => {
            console.error('Error fetching class data:', error); // Log any errors that occur
            // alert("Error occurred while fetching class data");
        });
}


  const fetchCurrentUser = () => {
    axios.get('http://localhost:3000/auth/current_admin_id')
      .then(result => {
        if (result.data.id) {
          const currentAdminId = result.data.id;
          const currentUser = admins.find(admin => admin.id === currentAdminId);
          setCurrentUser(currentUser);
        } else {
          alert("Failed to fetch current user");
        }console.log(currentUser)
      })
      .catch(error => {
        console.log("Error occurred while fetching current user")
        // alert("Error occurred while fetching current user");
      });
  }

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
          setAdminTotal(result.data.Result.length);
        } else {
          alert(result.data.Error)
        }
      })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/class_count')
      .then(result => {
        if (result.data.Status) {
          setClassTotal(result.data.Result[0].class)
        }
      })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const fetchStudentGenderStatistics = () => {
    axios.get('http://localhost:3000/auth/students')
      .then(result => {
        if (result.data.Status) {
          const students = result.data.Result;
          const maleCount = students.filter(student => student.Genre === 'Male').length;
          const femaleCount = students.filter(student => student.Genre === 'Female').length;
          setMaleCount(maleCount);
          setFemaleCount(femaleCount);
          renderChart(maleCount, femaleCount);
        } else {
          alert(result.data.Error)
        }
      })
  }

  const renderChart = (maleCount, femaleCount) => {
    const ctx = document.getElementById('genderChart');
    const existingChart = Chart.getChart(ctx);
    
    if (existingChart) {
      existingChart.destroy();
    }
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [{
          label: 'Gender Distribution',
          data: [maleCount, femaleCount],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Gender Distribution of Students'
          },
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    });
  }
  
  const renderClassAnalysisChart = (classData) => {
    const ctx = document.getElementById('classAnalysisChart');
  const existingChart = Chart.getChart(ctx);

  if (existingChart) {
    existingChart.destroy();
  }
  new Chart(ctx, {
        type: 'bar',
        data: {
            labels: classData.map(item => item.name),
            datasets: [{
                label: 'Number of Students',
                data: classData.map(item => item.student_count),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            // maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Number of Students in Each Class'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Students'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Class'
                    }
                }
            }
        }
    });
}

const fetchEmployeeCountsByCategory = () => {
  axios.get('http://localhost:3000/auth/employee_count_by_category')
    .then(response => {
      if (response.data.Status) {
        setEmployeeCounts(response.data.Result);
        renderEmployeeCategoryGraph(response.data.Result);
      } else {
        alert(response.data.Error);
      }
    })
    .catch(error => {
      console.error('Error fetching employee counts by category:', error);
      // Handle error
    });
};

const renderEmployeeCategoryGraph = (data) => {
  const ctx = document.getElementById('employeeCategoryGraph');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(item => item.name),
      datasets: [{
        label: 'Number of Employees',
        data: data.map(item => item.employee_count),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Number of Employees by Category'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Employees'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Category'
          }
        }
      }
    }
  });
};

  return (
    <div className='container mb-4'>
      <h4 className='p-3 m-2 '>
        {currentUser && (
          <Link to={`/dashboard/profile/${currentUser.id}`} className='d-flex bg-info-subtle p-2 w-25 rounded-pill ms-4'>
            <img src={`http://localhost:3000/Images/${currentUser.image}`} width='40px' className='img pt-1' alt={currentUser.name} />
            Welcome {currentUser.name}
          </Link>
        )}
      </h4>
      <div className='p-3 d-flex justify-content-around '>

        <Link to='/dashboard/classes' className='px-3 pt-2 pb-3 border bg-info-subtle rounded shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Classes</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{classTotal}  <i class="bi bi-easel ms-2"></i></h5>
          </div>
            </Link>

            <Link to='/dashboard/employee' className='px-3 pt-2 pb-3 border bg-info-subtle rounded shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Teachers</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{employeeTotal} <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-standing" viewBox="0 0 16 16"><path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0"/></svg></h5>
            </div>
            </Link>

            <Link to='/dashboard/employee' className='px-3 pt-2 pb-3 border bg-info-subtle rounded shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Salary</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{salaryTotal}  DH</h5>
            </div>
            </Link>
            </div>
            
            <div className='d-flex justify-content-between'>
            <Link to='/dashboard/students' className="mt-4 ps-4 w-40 ms-5 bg-info-subtle rounded mb-4 border shadow-sm pb-5" style={{ width: '50%', height: '300px' }}>
                <h5 className=" text-center p-2 pe-5">Gender Statistics of Students</h5>
                <canvas id="genderChart" width="200" height="200" className='d-flex justify-content-center ms-5 mb-5'></canvas>
              </Link>
            
            <div className='mt-2 px-5 pt-3 w-100'>
              <Carousel autoPlay={true} interval={5000} showArrows={true} showThumbs={false} infiniteLoop={true}>
                <div>
                  <img src="Images/img3.jpg" alt="slider-1" style={{ width: '100%', height: '300px' }} />
                </div>
                <div>
                  <img src="Images/img1.jpg" alt="slider-2" style={{ width: '100%', height: '300px' }} />
                </div>
                <div>
                  <img src="Images/img2.jpg" alt="slider-3" style={{ width: '100%', height: '300px' }} />
                </div>
              </Carousel>
              
            </div>
          </div> 

            <div className='d-flex '>
              
              <Link to='/dashboard/employee' className="mt-4 ms-5 w-50 ms-3 rounded bg-info-subtle border p-3 shadow-sm me-5 ">
                <h3 className="text-center">Employee Category Analysis</h3>
                <canvas id="employeeCategoryGraph" width="400" height="200" className='mt-5'></canvas>
              </Link>
              
              <Link to='/dashboard/classes' className="mt-4 w-35 border p-3 rounded bg-info-subtle shadow-sm me-5 ">
                <h3 className="text-center p-2">Number of Students in Each Class</h3>
                <canvas id="classAnalysisChart" width="400" height="200"></canvas>
              </Link>
            </div>
            
            
      </div>
  )
  }

export default Home;
