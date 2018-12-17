import React, { Component } from 'react'
import { Button } from 'reactstrap'

class RecipeList extends Component {
  render () {
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
          {/* <div className='recipe-list'>
          </div> */}
        </div>
      </div>
    )
  }
}

export default RecipeList
