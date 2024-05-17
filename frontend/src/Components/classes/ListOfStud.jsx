import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';

export default function ListOfStud() {
    const { id } = useParams(); 
    const [students, setStudents] = useState([]);
    const [clas,setClas] = useState('')

    useEffect(() => {
        if (id) {
            fetchStudents(id);
            fetchClass(id)
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

    const fetchStudents = (id) => {
        axios.get(`http://localhost:3000/auth/list_class/${id}`) 
            .then((response) => {
                if (response.data.Status) {
                    const formattedStudents = response.data.Result.map(student => ({
                        ...student,
                        date_of_birth: formatDateOfBirth(student.date_of_birth)
                    }));
                    setStudents(formattedStudents);
                } else {
                    alert(response.data.Error);
                }
            })
            .catch((error) => {
                console.error('Error fetching students:', error);
            });
    };

    const formatDateOfBirth = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    };

    const downloadStudentInfo = async (student) => {
        try {
            // Fetch the image as a blob
            const logoBlob = await fetchImage('/Images/adgham1.png');
            // Convert the blob to a Base64 string
            const logoData = await blobToBase64(logoBlob);

            // Fetch the student image as a blob
            const imageBlob = await fetchImage(`http://localhost:3000/Images/${student.image}`);
            // Convert the blob to a Base64 string
            const imgData = await blobToBase64(imageBlob);

            // Create a new jsPDF instance
            const doc = new jsPDF();

            // Add school logo
            doc.addImage(logoData, 'PNG', 20, 6, 40, 20); // Adjust position and size as needed

            // Add certificate content
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(`Certificat scolaire`, 100, 20, { align: 'center', fontWeight: 'bold' });
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Nom d'eleve : `, 20, 90);
            doc.setFont('helvetica', 'bold');
            doc.text(student.name, 50, 90);
            doc.setFont('helvetica', 'normal');
            doc.text(`Actuellement inscrit dans notre établissement en tant qu'étudiant en classe :`, 20, 100);
            doc.setFont('helvetica', 'bold');
            doc.text(student.class_id.toString()+`ère `, 150, 100); // Convert class_id to string
            doc.setFont('helvetica', 'normal');
            doc.text(`Ce certificat est délivré le`, 20, 110);
            doc.setFont('helvetica', 'bold');
            doc.text(getFormattedDate(), 70, 110);
            doc.setFont('helvetica', 'normal');
            doc.text(`Signature :`, 20, 150);
            doc.addImage(imgData, 'JPEG', 20, 40, 30, 30); // Add student image

            // Save the PDF
            doc.save(`${student.name}_certificate.pdf`);
        } catch (error) {
            console.error('Error downloading student certificate:', error);
        }
    };

    const fetchImage = async (url) => {
        const response = await fetch(url);
        return await response.blob();
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const getFormattedDate = () => {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleDownloadListPDF = () => {
        const doc = new jsPDF();
        doc.text(`List of students in ${clas}`, 75, 10);
        const rowData = students.map((student, index) => {
          return [index + 1, student.name, student.date_of_birth, student.address];
        });
        doc.autoTable({
          head: [['#', 'Name', 'date_of_birth', 'address']],
          body: rowData,
        });
        doc.save(`Students_List_Class_${id}.pdf`);
      };

    return (
        <div className="px-5 mt-3">
        <div className='d-flex justify-content-between mt-5 border p-2 bg-info-subtle'>
            <h4 className='pt-2'>List of students in {clas}</h4>
            <button
            className="btn btn-danger pt-2 rounded-pill shadow-sm mb-3"
            onClick={handleDownloadListPDF}
            >
            <i class="bi bi-file-earmark-arrow-down"></i>  Download List as PDF
            </button>
        </div>
            <table className='table table-bordered text-center'>
                <thead>
                    <tr>
                        <th className='bg-info-subtle'>#</th>
                        <th className='bg-info-subtle'>Image</th>
                        <th className='bg-info-subtle'>Name</th>
                        <th className='bg-info-subtle'>Date of Birth</th>
                        <th className='bg-info-subtle'>Address</th>
                        <th className='bg-info-subtle'>Attestation scolaire</th>
                    </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>
                            <img
                                src={`http://localhost:3000/Images/${student.image}`}
                                className="employee_image"
                                alt={student.name}
                            />
                        </td>
                        <td>{student.name}</td>
                        <td>{student.date_of_birth}</td>
                        <td>{student.address}</td>
                        <td>
                            <button
                                className="btn btn-danger rounded-circle btn-sm"
                                onClick={() => downloadStudentInfo(student)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16"><path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/></svg>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
