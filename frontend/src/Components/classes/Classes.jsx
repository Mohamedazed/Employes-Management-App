import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [searchParams, setSearchParams] = useState({ name: '', level: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        fetchData();
    }, [currentPage, searchParams]);

    const fetchData = () => {
        const queryParams = {
            ...searchParams,
            page: currentPage,
            pageSize: pageSize,
        };

        axios
            .get('http://localhost:3000/auth/classes', { params: queryParams })
            .then((result) => {
                if (result.data.Status) {
                    setClasses(result.data.Result);
                    setTotalPages(Math.ceil(result.data.Result.length / pageSize));
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axios
            .delete('http://localhost:3000/auth/delete_class/' + id)
            .then((result) => {
                if (result.data.Status) {
                    fetchData();
                } else {
                    alert(result.data.Error);
                }
            });
    };

    const handleSearch = () => {
        setCurrentPage(1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='px-5 mt-3'>
            <div className='mt-3'>
              <div className="border p-2 bg-light">
                <div className="d-flex justify-content-between align-items-center bg-info-subtle border-rounded mb-4">
                  <h4 className="p-2">classes List :</h4>
                    <Link to="/dashboard/add_class" className="m-2 p-2 btn bg-primary-subtle btn-sm me-2 rounded-pill shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/></svg> Add Class</Link>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <h5 className='bg-light ms-2 mb-4'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg> Find Class</h5>
                 </div> 
                  <div className="col-md-3">
                    
                    <div className="mb-2">
                      <label htmlFor="name" className="form-label ">Name:</label>
                      <input type="text" name="name" value={searchParams.name} onChange={handleChange} className='border form-control rounded-pill ms-2'/>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-2">
                      <label className="form-label" >Level:  </label>
                      <input type="text" name="level" value={searchParams.level} onChange={handleChange} className='border form-control rounded-pill ms-2'/>
                    </div> 
                  </div>    
                  <div className="col-md-3"><br/>
                    <div className="mb-2">
                      <button className='btn bg-success-subtle btn-sm me-2 mt-2 rounded-pill shadow-sm' onClick={() => handleSearch()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>

        <div className="border p-2 bg-light">
        <h3 className="text-info p-2 text-center">Information about classes </h3>
        <table className='table table-bordered text-center'>
                <thead>
                    <tr>
                        <th className='bg-info-subtle'>#</th>
                        <th className='bg-info-subtle'>Nom</th>
                        <th className='bg-info-subtle'>level</th>
                        <th className='bg-info-subtle'>Number of Students</th>
                        <th className='bg-info-subtle'>list of students</th>
                        <th className='bg-info-subtle'>list of teachers</th>
                        <th className='bg-info-subtle'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((c, i) => (
                        <tr key={i}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.level}</td>
                            <td>{c.student_count}</td>
                            <td>
                                <Link to={`/dashboard/list_class/${c.id}`} className="btn bg-success-subtle rounded-pill shadow-sm btn-sm me-2">
                                    Show <i className="bi bi-backpack3 ms-2"></i>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/dashboard/list_teachers/${c.id}`} className="btn bg-warning-subtle rounded-pill shadow-sm btn-sm me-2">
                                    Show <i className="bi bi-people ms-2"></i>
                                </Link>
                            </td>
                            <td>
                                <Link
                                    to={`/dashboard/edit_class/${c.id}`}
                                    className="btn bg-info-subtle btn-sm me-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"><path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" /></svg> Edit
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(c.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className='d-flex justify-content-center'>
                <nav aria-label='Page navigation example'>
                    <ul className='pagination'>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className='page-link'
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {totalPages <= 10 ? (
                            // Display all page buttons if total pages are less than or equal to 10
                            Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button
                                        className='page-link'
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))
                        ) : (
                            // Display up to 10 page buttons dynamically
                            Array.from({ length: 10 }, (_, index) => {
                                const page = index + 1 + (currentPage > 5 ? currentPage - 5 : 0);
                                return (
                                    page <= totalPages && (
                                        <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                            <button
                                                className='page-link'
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    )
                                );
                            })
                        )}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className='page-link'
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </div>
        </div>
    );
};