import React, { Component } from 'react'
import RecipeCard from '../RecipeCard'
import PropTypes from 'prop-types'
import { withFirebase } from '../Firebase'

class Search extends Component {
  constructor () {
    super()
    this.state = {
      recipes: [],
      filteredRecipes: [],
      searchText: ''
    }
  }

  componentDidMount () {
    this.props.firebase
      .recipes()
      .on('value', snapshot => {
        const recipesObj = snapshot.val()
        const recipesList = Object.keys(recipesObj)
          .map(key => ({
            ...recipesObj[key],
            id: key
          }))

        this.setState({
          recipes: recipesList
        })
      })
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { recipes, searchText } = this.state

    return (
      <div>
        <input
          name='searchText'
          type='text'
          placeholder='Search'
          value={searchText}
          onChange={this.handleOnChange}
        />
        <div className='recipe-list'>
          {recipes.map((recipe, index) =>
            <RecipeCard key={index} recipe={recipe} />
          )}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  firebase: PropTypes.shape({
    recipes: PropTypes.func
  })
}

export default withFirebase(Search)
