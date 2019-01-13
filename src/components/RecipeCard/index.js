import React from 'react'
import PropTypes from 'prop-types'

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
