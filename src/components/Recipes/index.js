import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

import RecipeCard from '../RecipeCard'
import AddRecipeCard from '../AddRecipeCard'

class Recipes extends Component {
  render () {
    const { recipes } = this.props

    if (recipes) {
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
              {recipes.map(recipe => {
                return (
                  <Link to={`/recipes/${recipe.id}`}>
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  </Link>
                )
              })}
              <AddRecipeCard />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: 'recipes' }]),
  connect((state, props) => ({
    recipes: state.firestore.ordered.recipes
  }))
)(Recipes)
