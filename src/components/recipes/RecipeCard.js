import React from 'react';
import {Link} from 'react-router-dom'
import {Card, CardImg, CardBody, CardTitle, Button} from 'reactstrap';

const RecipeCard = () => {
  
  return (
    <Link to={`/recipes/healthy-eggs`}> 
      <Card>
        <CardImg style={{height: "216px", width: "216px"}} top width="100%" src="https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg" alt="Healthy eggs"/>
        <CardBody>
          <CardTitle>Healthy Eggs</CardTitle>
          <Button>Full recipe</Button>
        </CardBody>
      </Card>
    </Link>
  );
}

export default RecipeCard;

