import React from 'react'

const DeleteModal = props => {
  return (
    <div className='modal fade'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-hidden='true'>
              &times;
            </button>
            <h4 className='modal-title'>Confirm Delete</h4>
          </div>
          <div className='modal-body'>
            <p>Are you sure you want to delete?</p>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-default'
              data-dismiss='modal'>
              Yes
            </button>
            <button
              type='button'
              className='btn btn-primary'
              data-dismiss='modal'>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
