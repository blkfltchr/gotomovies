import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import RecipeCard from '../RecipeCard'
import AddRecipeCard from '../AddRecipeCard'

import './index.css'

const condition = authUser => !!authUser

class Recipes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recipes: [],
      noRecipes: false
    }
  }

  componentDidMount () {
    const userId = this.props.userId

    this.props.firebase
      .userRecipes(userId)
      .on('value', snapshot => {
        if (snapshot.val()) {
          this.setState({ recipes: snapshot.val() })
        } else {
          this.setState({ noRecipes: true })
        }
      })
  }

  componentWillUnmount () {
    const userId = this.props.userId

    this.props.firebase
      .userRecipes(userId)
      .off()
  }

  render () {
    const { recipes, noRecipes } = this.state

    if (noRecipes) {
      return <h1>You do not have any recipes.</h1>
    } else if (!recipes.length) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <p className='browse-meals'>Browse recipes by meal</p>

        <div className='meal-buttons'>
          <button className='btn btn-primary'>All</button>
          <button className='btn btn-primary'>Breakfast</button>
          <button className='btn btn-primary'>Lunch</button>
          <button className='btn btn-primary'>Dinner</button>
        </div>

        <div className='center'>
          <div className='recipe-list'>
            {recipes.map(recipe => (
              <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                <RecipeCard recipe={recipe} />
              </Link>
            ))}
            <AddRecipeCard />
          </div>
        </div>
      </div>
    )
  }
}

Recipes.propTypes = {
  userId: PropTypes.string,
  firebase: PropTypes.shape({
    userRecipes: PropTypes.func
  })
}

export default withAuthorization(condition)(Recipes)
