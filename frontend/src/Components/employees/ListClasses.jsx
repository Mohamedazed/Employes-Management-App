// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { jsPDF } from 'jspdf';

// export default function ListClasses() {
//     const [classes, setClasses] = useState([]);
//     const [students, setStudents] = useState([]);
//     const { id } = useParams();
//     const [clas,setClas] = useState('')

//     useEffect(() => {
//         axios.get(`http://localhost:3000/employee/employee/classes/${id}`)
//             .then(response => {
//                 setClasses(response.data.Result || []);
//                 setClas(response.data.Result[0].name);
//             })
//             .catch(error => {
//                 console.error('Error fetching classes:', error);
//             });
//     }, [id]);

   
//         // Fetch students for each class individually
//         const fetchStudents = async () => {
//             const studentPromises = classes.map(classItem => {
//                 return axios.get(`http://localhost:3000/employee/class/${classItem.id}/students`)
//                     .then(response => response.data.Result || [])
//                     .catch(error => {
//                         console.error(`Error fetching students for class ${classItem.id}:`, error);
//                         return [];
//                     });
//             });

//             // Wait for all student fetch requests to complete
//             const students = await Promise.all(studentPromises);
//             setStudents(students.flat());
//         };

//         useEffect(() => {
//             if (classes.length > 0) {
//                 fetchStudents();
//             }
//         }, [classes]);

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString();
//     };

//     const handleDownloadListPDF = () => {
//         const doc = new jsPDF();
//         doc.text(`List of students in ${clas}`, 75, 10);
//         const rowData = students.map((student, index) => {
//           return [index + 1, student.name, student.date_of_birth, student.address];
//         });
//         doc.autoTable({
//           head: [['#', 'Name', 'date_of_birth', 'address']],
//           body: rowData,
//         });
//         doc.save(`Students_List_Class_${id}.pdf`);
//       };

//     return (
//         <div >
//             <div className="p-2 d-flex justify-content-center shadow">
//                 <Link to={`/employee_detail/${id}`} className=' rounded-pill'>
//                     <img src="/Images/adgham2.jpg" className="rounded"  alt="Logo" />
//                 </Link>
//             </div>
//             <div className='container m-4'>
//             <div className='d-flex justify-content-between'>
//                 <div>
//                     <h3>Class</h3>
//                     <p>
//                     <span>
//                         <Link to={`/employee_detail/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                         Profil{' '}
//                         </Link>
//                     </span>
//                     / <span style={{ color: 'gray' }}>Class</span>
//                     </p>
//                 </div>

//                 <div >
//                 <Link to={`/employee_detail/${id}`} className='btn btn-danger rounded-pill mb-2'>
//                     <i class="bi bi-house-door"></i> Back
//                 </Link><br/>
//                 <button
//                     className="btn btn-success pt-2 rounded-pill shadow-sm mb-3"
//                     onClick={handleDownloadListPDF}
//                 >
//                     <i class="bi bi-file-earmark-arrow-down"></i>  Download List of students
//                     </button>
//                 </div>
//             </div>
            
//             <div className='mt-5'>
//             <h2>List of Classes</h2>
//             <table className='table table-bordered me-5 text-center'>
//                 <thead>
//                    <tr> 
//                     <th className='bg-info-subtle'><strong>Class Name:</strong> </th>
//                     <th className='bg-info-subtle'><strong>Level:</strong></th>
//                     <th className='bg-info-subtle'><strong>Number of Students</strong></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {classes.map(classItem => (
//                     <tr key={classItem.id}>
//                         <td>{classItem.name}</td>  
//                         <td>{classItem.level}</td>
//                         <td>{students.filter(student => student.class_id === classItem.id).length} Students</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             {classes.length === 0 && <p>No classes found.</p>}
//             </div>

//             <div className='mt-5'>
//             <h2>List of Students</h2>
//             <table className='table table-bordered me-5 text-center'>
//                 <thead>
//                    <tr> 
//                     <th className='bg-info-subtle'><strong>Name</strong> </th>
//                     <th className='bg-info-subtle'><strong>Date of Birth</strong></th>
//                     <th className='bg-info-subtle'><strong>Address</strong></th>
//                     <th className='bg-info-subtle'><strong>Gendre</strong></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {students.map(student => (
//                     <tr key={student.id}>
//                         <td>{student.name}</td> 
//                         <td>{formatDate(student.date_of_birth)}</td>
//                         <td>{student.address}</td>
//                         <td>{student.Genre}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             {students.length === 0 && <p>No students found.</p>}
//             </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';

export default function ListClasses() {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const { id } = useParams();
    const [clas, setClas] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/employee/classes/${id}`)
            .then(response => {
                setClasses(response.data.Result || []);
                setClas(response.data.Result[0].name);
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
            });
    }, [id]);

    useEffect(() => {
        const fetchStudents = async () => {
            const studentPromises = classes.map(classItem => {
                return axios.get(`http://localhost:3000/employee/class/${classItem.id}/students`)
                    .then(response => {
                        const studentsWithClass = response.data.Result.map(student => ({
                            ...student,
                            class_name: classItem.name // Add class name to each student
                        }));
                        return studentsWithClass;
                    })
                    .catch(error => {
                        console.error(`Error fetching students for class ${classItem.id}:`, error);
                        return [];
                    });
            });

            const students = await Promise.all(studentPromises);
            const allStudents = students.flat();
            setStudents(allStudents);
        };

        if (classes.length > 0) {
            fetchStudents();
        }
    }, [classes]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleDownloadListPDF = () => {
        const doc = new jsPDF();
        doc.text(`List of students in ${clas}`, 75, 10);
        const rowData = students.map((student, index) => {
            return [
                index + 1,
                student.name,
                student.date_of_birth,
                student.address,
                student.Genre, 
                student.class_name 
            ];
        });
        doc.autoTable({
            head: [['#', 'Name', 'Date of Birth', 'Address', 'Gender', 'Class']],
            body: rowData,
        });
        doc.save(`Students_List_Class_${id}.pdf`);
    };
    

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <Link to={`/employee_detail/${id}`} className=' rounded-pill'>
                    <img src="/Images/adgham2.jpg" className="rounded" alt="Logo" />
                </Link>
            </div>
            <div className='container m-4'>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h3>Class</h3>
                        <p>
                            <span>
                                <Link to={`/employee_detail/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Profil{' '}
                                </Link>
                            </span>
                            / <span style={{ color: 'gray' }}>Class</span>
                        </p>
                    </div>

                    <div >
                        <Link to={`/employee_detail/${id}`} className='btn btn-danger rounded-pill mb-2'>
                            <i className="bi bi-house-door"></i> Back
                        </Link><br />
                        <button
                            className="btn btn-success pt-2 rounded-pill shadow-sm mb-3"
                            onClick={handleDownloadListPDF}
                        >
                            <i className="bi bi-file-earmark-arrow-down"></i> Download List of students
                        </button>
                    </div>
                </div>

                <div className='mt-5'>
                    <h2>List of Classes</h2>
                    <table className='table table-bordered me-5 text-center'>
                        <thead>
                            <tr>
                                <th className='bg-info-subtle'><strong>Class Name:</strong> </th>
                                <th className='bg-info-subtle'><strong>Level:</strong></th>
                                <th className='bg-info-subtle'><strong>Number of Students</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map(classItem => (
                                <tr key={classItem.id}>
                                    <td>{classItem.name}</td>
                                    <td>{classItem.level}</td>
                                    <td>{students.filter(student => student.class_id === classItem.id).length} Students</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {classes.length === 0 && <p>No classes found.</p>}
                </div>

                <div className='mt-5'>
                    <h2>List of Students</h2>
                    <table className='table table-bordered me-5 text-center'>
                        <thead>
                            <tr>
                                <th className='bg-info-subtle'><strong>Name</strong> </th>
                                <th className='bg-info-subtle'><strong>Date of Birth</strong></th>
                                <th className='bg-info-subtle'><strong>Address</strong></th>
                                <th className='bg-info-subtle'><strong>Gendre</strong></th>
                                <th className='bg-info-subtle'><strong>Class</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{formatDate(student.date_of_birth)}</td>
                                    <td>{student.address}</td>
                                    <td>{student.Genre}</td>
                                    <td>{student.class_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {students.length === 0 && <p>No students found.</p>}
                </div>
            </div>
        </div>
    );
}
