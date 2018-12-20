import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const RecipeCard = (props) => {
  return (
    <div className='card' style={{ width: '255px', margin: '1rem' }} key={props.recipe.id}>
      <div className='card-body'>
        <h5 className='card-title'>
          {props.recipe.title}
        </h5>
        <img
          className='card-img-top'
          style={{ height: '216px', width: '216px' }}
          top width='100%'
          src={props.recipe.image}
          alt={props.recipe.title} />
      </div>
      <Link
        to={`/recipes/${props.recipe.id}`}
        className='btn btn-primary btn-sm'
      >
        <i className='fas fa-arrow-circle-right' /> Full recipe
      </Link>
    </div>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.title,
    image: PropTypes.string,
    id: PropTypes.string
  })
}

export default RecipeCard
