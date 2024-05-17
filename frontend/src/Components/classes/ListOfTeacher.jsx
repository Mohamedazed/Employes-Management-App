// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// export default function ListOfTeacher() {
//   const { id } = useParams(); 
//   const [teachers, setTeachers] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [clas,setClas] = useState('')

//   useEffect(() => {
//     if (id) {
//       fetchTeachers(id);
//       fetchCategories();
//       fetchClass(id);
//     }
//   }, [id]);

//   const fetchClass = (id) => {
//     axios.get(`http://localhost:3000/auth/class/${id}`) 
//       .then((response) => {
//         if (response.data.Status) {
//           setClas(response.data.Result[0].name);
//         } else {
//           alert(response.data.Error);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching class:', error);
//       });
//   };

//   // const fetchTeachers = (id) => {
//   //   axios.get(`http://localhost:3000/auth/list_teacher/${id}`) 
//   //     .then((response) => {
//   //       if (response.data.Status) {
//   //         setTeachers(response.data.Result);
//   //       } else {
//   //         alert(response.data.Error);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching teachers:', error);
//   //     });
//   // };
//   const fetchTeachers = (name) => {
//     axios.get(`http://localhost:3000/auth/list_teacher/${name}`)
//       .then((response) => {
//         if (response.data.Status) {
//           setTeachers(response.data.Result);
//         } else {
//           alert(response.data.Error);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching teachers:', error);
//       });
// };


//   const fetchCategories = () => {
//     axios.get("http://localhost:3000/auth/category")
//       .then((result) => {
//         if (result.data.Status) {
//           setCategories(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleDownloadListPDF = () => {
//     const doc = new jsPDF();
//     doc.text(`List of Teachers in ${clas}`, 75, 10);
//     const rowData = teachers.map((teacher, index) => {
//       const category = categories.find(category => category.id === teacher.category_id)?.name || '';
//       return [index + 1, teacher.name, teacher.email, teacher.salary, teacher.address, category];
//     });
//     doc.autoTable({
//       head: [['#', 'Name', 'Email', 'Salary', 'Address', 'Category']],
//       body: rowData,
//     });
//     doc.save(`Teachers_List_Class_${id}.pdf`);
//   };

//   return (
//     <div className="px-5 mt-3">
//       <div className='d-flex justify-content-between mt-5 border p-2 bg-info-subtle'>
//         <h4 className='pt-2'>List of teachers in {clas}</h4>
//         <button
//           className="btn btn-danger pt-2 rounded-pill shadow-sm mb-3"
//           onClick={handleDownloadListPDF}
//         >
//         <i class="bi bi-file-earmark-arrow-down"></i>  Download List as PDF
//         </button>
//       </div>
//       <table className='table table-bordered text-center'>
//         <thead>
//           <tr>
//             <th className='bg-info-subtle'>#</th>
//             <th className='bg-info-subtle'>Name</th>
//             <th className='bg-info-subtle'>Email</th>
//             <th className='bg-info-subtle'>Salary</th>
//             <th className='bg-info-subtle'>Address</th>
//             <th className='bg-info-subtle'>Category</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((teacher, index) => (
//             <tr key={teacher.id}>
//               <td>{index + 1}</td>
//               <td>{teacher.name}</td>
//               <td>{teacher.email}</td>
//               <td>{teacher.salary}</td>
//               <td>{teacher.address}</td>
//               <td>{categories.find(category => category.id === teacher.category_id)?.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function ListOfTeacher() {
  const { id } = useParams(); 
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clas, setClas] = useState('');

  useEffect(() => {
    if (id) {
      fetchTeachers(id);
      fetchCategories();
      fetchClass(id);
    }
  }, [id]);

  const fetchClass = (id) => {
    axios.get(`http://localhost:3000/auth/class/${id}`) 
      .then((response) => {
        if (response.data.Status) {
          setClas(response.data.Result[0].name);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error fetching class:', error);
      });
  };

  const fetchTeachers = (id) => {
    axios.get(`http://localhost:3000/auth/list_teachers/${id}`)
      .then((response) => {
        if (response.data.Status) {
          setTeachers(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      })
      .catch((error) => {
        console.error('Error fetching teachers:', error);
      });
  };

  const fetchCategories = () => {
    axios.get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDownloadListPDF = () => {
    const doc = new jsPDF();
    doc.text(`List of Teachers in ${clas}`, 75, 10);
    const rowData = teachers.map((teacher, index) => {
      const category = categories.find(category => category.id === teacher.category_id)?.name || '';
      return [index + 1, teacher.name, teacher.email, teacher.salary, teacher.address, category];
    });
    doc.autoTable({
      head: [['#', 'Name', 'Email', 'Salary', 'Address', 'Category']],
      body: rowData,
    });
    doc.save(`Teachers_List_Class_${id}.pdf`);
  };

  const filterTeachersByCategory = (categoryName) => {
    return teachers.filter(teacher => categories.find(category => category.name === categoryName)?.id === teacher.category_id);
  };

  return (
    <div className="px-5 mt-3">
      <div className='d-flex justify-content-between mt-5 border p-2 bg-info-subtle'>
        <h4 className='pt-2'>List of teachers in {clas}</h4>
        <button
          className="btn btn-danger pt-2 rounded-pill shadow-sm mb-3"
          onClick={handleDownloadListPDF}
        >
          <i className="bi bi-file-earmark-arrow-down"></i>  Download List as PDF
        </button>
      </div>
      {/* Table for each category */}
      {['Arts teacher', 'Arabic teacher', 'French teacher', 'English teacher', 'Science teacher', 'Math teacher', 'Sport teacher', 'Informatique teacher', 'Education islamic teacher', 'Historic teacher'].map(category => (
        <div key={category} className="mt-3">
          <h5>{category}</h5>
          <table className='table table-bordered text-center'>
            <thead>
              <tr>
                <th className='bg-info-subtle'>#</th>
                <th className='bg-info-subtle'>Name</th>
                <th className='bg-info-subtle'>Email</th>
                <th className='bg-info-subtle'>Salary</th>
                <th className='bg-info-subtle'>Address</th>
              </tr>
            </thead>
            <tbody>
              {filterTeachersByCategory(category).map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.salary}</td>
                  <td>{teacher.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
