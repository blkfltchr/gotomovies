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
      noRecipes: false,
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
        mealType: 'all',
        filteredRecipes: recipes,
        noFilteredResults: false
      })
    }
  }

  render () {
    console.log('this.state.meal:', this.state.mealType)
    console.log('this.state.filteredRecipes:', this.state.filteredRecipes)
    console.log('this.state.recipes:', this.state.recipes)
    const {
      mealType,
      noFilteredResults,
      filteredRecipes,
      loading,
      noRecipes
    } = this.state

    const theRecipes = mealType === 'all' ? this.state.recipes : filteredRecipes

    if (loading) {
      return <h1>Loading...</h1>
    } else if (noRecipes) {
      return (
        <div>
          <h1>You do not have any recipes.</h1>
          <AddRecipeCard />
        </div>
      )
    } else if (noFilteredResults) {
      return <h1>There are no recipes for {mealType}...</h1>
    }

    return (
      <div>
        <p className='browse-meals'>Browse recipes by meal</p>

        <div className='meal-buttons'>
          <button className='btn btn-primary mx-2' onClick={this.handleOnClick} name='all'>All</button>
          <button className='btn btn-primary mx-2' onClick={this.handleOnClick} name='breakfast'>Breakfast</button>
          <button className='btn btn-primary mx-2' onClick={this.handleOnClick} name='lunch'>Lunch</button>
          <button className='btn btn-primary mx-2' onClick={this.handleOnClick} name='dinner'>Dinner</button>
        </div>

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
