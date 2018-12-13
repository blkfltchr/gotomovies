import React from 'react';
import {Link} from 'react-router-dom'
import {Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';

const RecipeCard = (props) => {
  console.log('Props', props)
  return (
    <Link to={`/recipes/healthy-eggs`}> 
      <Card style={{padding: "10px", margin: "10px"}}>
        <CardImg style={{height: "216px", width: "216px", margin: "0 auto"}} top width="100%" src={props.recipe.image} alt="Healthy eggs"/>
        <CardBody>
          <CardTitle>{props.recipe.title}</CardTitle>
          <Button>Full recipe</Button>
        </CardBody>
      </Card>
    </Link>
  );
}

export default RecipeCard;

