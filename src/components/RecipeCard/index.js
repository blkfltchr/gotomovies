import React from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import PropTypes from 'prop-types'

const RecipeCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{props.recipe.title}</CardTitle>
        <CardImg
          style={{ height: '216px', width: '216px' }}
          top width='100%'
          src={props.recipe.image}
          alt={props.recipe.title} />
      </CardBody>
    </Card>
  )
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.title,
    image: PropTypes.string
  })
}

export default RecipeCard
