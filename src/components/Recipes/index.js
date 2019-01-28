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
      loading: true,
      noRecipes: false
    }
  }

  componentDidMount () {
    const USER_ID = this.props.userId

    this.props.firebase
      .userRecipes(USER_ID)
      .on('value', snapshot => {
        const userRecipesObj = snapshot.val()
        if (userRecipesObj) {
          const userRecipesList = Object.keys(userRecipesObj)
            .map(key => ({
              ...userRecipesObj[key],
              id: key
            }))

          this.setState({
            recipes: userRecipesList,
            loading: false,
            noRecipes: false
          })
        } else {
          this.setState({
            noRecipes: true,
            loading: false
          })
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
    const {
      recipes,
      loading,
      noRecipes
    } = this.state

    if (loading) {
      return <h1>Loading...</h1>
    } else if (noRecipes) {
      return <h1>You do not have any recipes.</h1>
    }

    return (
      <div>
        <p className='browse-meals'>Browse recipes by meal</p>

        <div className='meal-buttons'>
          <button className='btn btn-primary mx-2'>All</button>
          <button className='btn btn-primary mx-2'>Breakfast</button>
          <button className='btn btn-primary mx-2'>Lunch</button>
          <button className='btn btn-primary mx-2'>Dinner</button>
        </div>

        <div className='center'>
          <div className='recipe-list'>
            {recipes.map(recipe => (
              <Link style={{ textDecoration: 'none' }}key={recipe.id} to={`/recipes/${recipe.id}`}>
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
