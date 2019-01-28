import React, { Component } from 'react'
import RecipeCard from '../RecipeCard'
import PropTypes from 'prop-types'
import { withFirebase } from '../Firebase'

class Search extends Component {
  constructor () {
    super()
    this.state = {
      text: '',
      recipes: [],
      filteredRecipes: [],
      noFilteredResults: '',
      loading: true
    }
  }

  componentDidMount () {
    this.props.firebase
      .recipes()
      .on('value', snapshot => {
        const recipesObj = snapshot.val()

        if (recipesObj) {
          const recipesList = Object.keys(recipesObj)
            .map(key => ({
              ...recipesObj[key],
              id: key
            }))
          
          this.setState({
            loading: false,
            recipes: recipesList
          })
        } else {
          this.setState({
            loading: false
          })
        }
      })
  }

  componentWillUnmount () {
    this.props.firebase
      .recipes()
      .off()
  }

  handleOnChange = event => {
    const text = event.target.value
    const { recipes } = this.state

    if (text) {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().search(text.toLowerCase()) >= 0)

      if (filteredRecipes.length) {
        this.setState({
          text,
          filteredRecipes,
          noFilteredResults: false
        })
      } else {
        this.setState({
          text,
          noFilteredResults: true
        })
      }
    } else {
      this.setState({
        text: '',
        filteredRecipes: [],
        noFilteredResults: false
      })
    }
  }

  render () {
    const {
      text,
      recipes,
      filteredRecipes,
      noFilteredResults,
      loading
    } = this.state

    if (loading) {
      return <h1>Loading...</h1>
    } else if (!recipes.length) {
      return <h1>There are no recipes in the database.</h1>
    }

    return (
      <div>
        <input
          name='searchText'
          type='text'
          placeholder='Search'
          value={text}
          onChange={this.handleOnChange}
        />
        {noFilteredResults
          ? <h1>No results found.</h1>
          : <div className='recipe-list'>
            {filteredRecipes.length
              ? filteredRecipes.map((recipe, index) =>
                <RecipeCard key={index} recipe={recipe} />)
              : recipes.map((recipe, index) =>
                <RecipeCard key={index} recipe={recipe} />)}
          </div>}
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
