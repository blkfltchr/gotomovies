import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import RecipeCard from '../RecipeCard'
import AddRecipeCard from '../AddRecipeCard'
import SortByMeal from '../SortByMeal'

import './index.css'

const condition = authUser => !!authUser

class Recipes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      recipes: [],
      loading: true,
      mealType: 'all',
      filteredRecipes: [],
      noFilteredResults: false
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
            loading: false
          })
        } else {
          this.setState({
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

  handleOnClick = (event) => {
    const mealType = event.target.name
    const { recipes, meal } = this.state

    if (meal !== 'all') {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.meal === mealType
      )
      if (filteredRecipes.length) {
        this.setState({
          mealType,
          filteredRecipes,
          noFilteredResults: false
        })
      } else {
        this.setState({
          mealType,
          noFilteredResults: true
        })
      }
    } else {
      this.setState({
        noFilteredResults: false
      })
    }
  }

  render () {
    console.log('this.state.meal:', this.state.mealType)
    console.log('this.state.filteredRecipes:', this.state.filteredRecipes)
    console.log('this.state.recipes:', this.state.recipes)
    console.log('this.state.noFilteredResults:', this.state.noFilteredResults)
    const {
      mealType,
      noFilteredResults,
      filteredRecipes,
      loading,
      recipes
    } = this.state

    const theRecipes = mealType === 'all' ? this.state.recipes : filteredRecipes

    if (loading) {
      return <h1>Loading...</h1>
    } else if (recipes.length === 0) {
      return (
        <div>
          <h1>You do not have any recipes.</h1>
          <AddRecipeCard />
        </div>
      )
    } else if (mealType !== 'all' && noFilteredResults === true) {
      return (
        <div>
          <SortByMeal handleOnClick={this.handleOnClick} />
          <h1 className='text-center mt-3'>There are no recipes for {mealType}...</h1>
        </div>
      )
    }

    return (
      <div>
        <SortByMeal handleOnClick={this.handleOnClick} />
        <div className='center'>
          <div className='recipe-list'>
            {theRecipes.map(recipe => (
              <Link
                style={{ textDecoration: 'none' }}
                className='no-decoration'
                key={recipe.id}
                to={`/recipes/${recipe.id}`}>
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
