import React from 'react'

export default function EditModalProfil({ isOpen, onClose, values, setValues ,handleChange, handleSubmit }) {
    if (!isOpen) {
        return null;
      }
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', display: 'block', width: '100%' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit values</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className='form-group mb-3'>
                        <label> Name :</label>
                        <input type='text' className='form-control rounded-pill
                        ' id='name' name='name' value={values.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group mb-3">
                        <label>Select Image :</label>
                        <input type="file" name="image" onChange={(e) => setValues({...values, image: e.target.files[0]})} className="form-control rounded-pill" />
                      </div>
                      <button type="submit" className='btn btn-primary'>Update</button>
                      <button className='btn btn-secondary ms-2 rounded-pill shadow-sm' onClick={onClose}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
  )
}

