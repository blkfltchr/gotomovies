import React from 'react'
import { Link } from 'react-router-dom'

const AddRecipeCard = () => {
  return (
    <div className='card' style={{ width: '255px', margin: '1rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>Add a recipe</h5>
        <Link to={'/recipes/add'} style={{ textDecoration: 'none' }}>
          <div style={{ height: '216px', width: '216px', border: '1px solid lightgrey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <i
              className='fa fa-plus fa-5x'
              aria-hidden='true'
              style={{ color: 'lightgrey' }} />
          </div>
        </Link>
      </div>
      <Link
        to={'/recipes/add'}
        className='btn btn-primary btn-sm'>
        <i className='fas fa-arrow-circle-right' /> Add a recipe
      </Link>
    </div>
  )
}

export default AddRecipeCard
