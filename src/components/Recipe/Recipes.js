import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import RecipeCard from './RecipeCard'
import AddRecipeCard from './AddRecipeCard'
import { Button } from 'reactstrap'

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
              <AddRecipeCard />
              {recipes.map(recipe => {
                return (
                  <Link to={`/recipes/${recipe.id}`}>
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  </Link>
                )
              })}
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
