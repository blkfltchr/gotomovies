import React from 'react'
import PropTypes from 'prop-types'

const RecipeCard = (props) => {
  const { id, title, image } = props.recipe
  return (
    <div className='card' style={{
      width: '255px',
      margin: '1rem',
      maxHeight: '349px'
    }}>
      <div className='card-body' style={{ maxHeight: '316px' }}>
        <h5 className='card-title' style={{ height: '48px' }}>{title}</h5>
        <img
          className='card-img-top'
          style={{ height: '216px', width: '216px' }}
          width='100%'
          src={image}
          alt={title} />
      </div>
      <div
        style={{ textDecoration: 'none' }}
        to={`/recipes/${id}`}
        className='btn btn-primary btn-sm'>
        View Full Recipe<i className='fas fa-arrow-right' />
      </div>
    </div>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.title,
    image: PropTypes.string
  })
}

export default RecipeCard
