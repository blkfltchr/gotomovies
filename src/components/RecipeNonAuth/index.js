import React from 'react'
import PropTypes from 'prop-types'

const RecipeNonAuth = props => {
  const {
    title,
    description,
    image,
    ingredients,
    instructions,
    meal,
    preptime
  } = props.recipe

  return (
    <div className='recipe-card'>
      <div className='flex-wrapper'>
        <img src={image} alt={title} className='recipe-image' />
      </div>

      <div className='delete-flex'>
        <h3>{title}</h3>
      </div>

      <div>
        <p>{description}</p>
        <p>{instructions}</p>
        <p> Ingredients:{' '}
          {ingredients.map((ingredient, index) =>
            <span key={index} className='recispane-ingredients'>
              {ingredient},
            </span>
          )}
        </p>
        <p>{preptime} minutes preptime</p>
        <p>{meal}</p>
      </div>
    </div>
  )
}

RecipeNonAuth.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.array,
    instructions: PropTypes.string,
    meal: PropTypes.string,
    preptime: PropTypes.string
  })
}

export default RecipeNonAuth
