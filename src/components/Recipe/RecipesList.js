import React, { Component } from 'react'
import RecipeCard from './RecipeCard'
import { Button } from 'reactstrap'

class RecipeList extends Component {
  render () {
  const recipesData = [
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
