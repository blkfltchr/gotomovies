import React from 'react'
import PropTypes from 'prop-types'

const SortByMeal = (props) => {
  return (
    <div>
      <p className='browse-meals'>Browse recipes by meal</p>
      <div className='meal-buttons'>
        <button className='btn btn-primary mx-2' onClick={props.handleOnClick} name='all'>All</button>
        <button className='btn btn-primary mx-2' onClick={props.handleOnClick} name='breakfast'>Breakfast</button>
        <button className='btn btn-primary mx-2' onClick={props.handleOnClick} name='lunch'>Lunch</button>
        <button className='btn btn-primary mx-2' onClick={props.handleOnClick} name='dinner'>Dinner</button>
      </div>
    </div>
  )
}

SortByMeal.propTypes = {
  handleOnClick: PropTypes.func
}

export default SortByMeal
