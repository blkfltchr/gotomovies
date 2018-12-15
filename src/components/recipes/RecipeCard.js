import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap'
import PropTypes from 'prop-types'

const RecipeCard = (props) => {
  return (
    <Link to='/recipes/healthy-eggs'>
      <Card>
        <CardImg
          style={{ height: '216px', width: '216px' }}
          top width='100%'
          src={props.recipe.image}
          alt={props.recipe.title} />
        <CardBody>
          <CardTitle>{props.recipe.title}</CardTitle>
          <Button>Full recipe</Button>
        </CardBody>
      </Card>
    </Link>
  )
}

RecipeCard.propTypes = {
  recipe: {
    image: PropTypes.string,
    title: PropTypes.title
  }
}

export default RecipeCard
