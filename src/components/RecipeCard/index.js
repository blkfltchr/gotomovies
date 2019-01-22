import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const RecipeCard = (props) => {
  const { title, image } = props.recipe
  return (
    <div className='card' style={{ width: '255px', margin: '1rem' }}>
      <div className='card-body'>
        <h5 className='card-title'>
          {title}
        </h5>
        <img
          className='card-img-top'
          style={{ height: '216px', width: '216px' }}
          width='100%'
          src={image}
          alt={title} />
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
    id: PropTypes.number,
    title: PropTypes.title,
    image: PropTypes.string
  })
}

export default RecipeCard
