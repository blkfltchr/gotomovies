import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import RecipeCard from '../RecipeCard'
import AddRecipeCard from '../AddRecipeCard'

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
      .recipes(userId)
      .on('value', snapshot => {
        const recipes = snapshot.val()

        if (recipes) {
          this.setState({
            recipes,
            noRecipes: false })
        } else {
          this.setState({ noRecipes: true })
        }
      })
  }
  componentWillUnmount () {
    this.props.firebase
      .recipes()
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
          <Button className='meal-button'>All</Button>
          <Button className='meal-button'>Breakfast</Button>
          <Button className='meal-button'>Lunch</Button>
          <Button className='meal-button'>Dinner</Button>
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
    recipes: PropTypes.func
  })
}

export default withAuthorization(condition)(Recipes)
