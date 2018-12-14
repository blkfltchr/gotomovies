import React, { Component } from 'react'
import RecipeCard from './RecipeCard'
import { Button } from 'reactstrap'

class RecipeList extends Component {
  render () {
    const recipesData = [
      {
        id: 0,
        title: 'Healthy eggs',
        description:
          'Fried eggs with beans and spinach, topped with salsa and hot sauce',
        meal: 'breakfast',
        instructions:
          'Add oil and spinach to a frying pan. Once the spinach has started shrivelling up, break your desired number of eggs into the frying pan. Soon after, add beans. Once cooked, top with salsa and hot sauce.',
        ingredients: 'eggs, black beans, spinach, salsa, hot sauce',
        image:
          'https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg',
        preptime: '15 minutes'
      },
      {
        id: 1,
        title: 'Salmon spinach salad',
        description:
          'Fresh spinach leaves, salmon, chopped veggies and ranch dressing',
        meal: 'lunch',
        instructions:
          'Prepare salmon from a can (or cook it from fresh or frozen) and chop up your favourite vegetables. In a big bowl, combine the salmon and veggies with spinach. Add salad dressing, toss and serve.',
        ingredients:
          'spinach, salmon, carrots, broccoli, red peppers, ranch dressing',
        image:
          'https://www.bbcgoodfood.com/sites/default/files/styles/bbcgf_recipe/public/user-recipe/Warm%20Salmon%20Salad_10.jpg?itok=YK8kZ71p',
        preptime: '15 minutes'
      }
    ]
    
    return (
      <div>
        <p className='browse-meals'>Browse recipes by meal</p>
        <div className='meal-buttons'>
          <Button className='meal-button'>All</Button>
          <Button className='meal-button'>Breakfast</Button>
          <Button className='meal-button'>Lunch</Button>
          <Button className='meal-button'>Dinner</Button>
        </div>
        <div className='center'>
          <div className='recipe-list'>
            {recipesData.map((recipe) => {
              return (
                <RecipeCard key={recipe.id} recipe={recipe} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeList
