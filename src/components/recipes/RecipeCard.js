import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap'

const RecipeCard = (props) => {
  console.log("recipe card props", props)
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

export default RecipeCard
