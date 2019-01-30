import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
      noFilteredResults: false,
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
    const regexTitle = new RegExp(text, 'gi')
    const regexIngredient = new RegExp(text, 'gi')

    if (text) {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.title.match(regexTitle) ||
          recipe.ingredients.join(' ').match(regexIngredient))

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
        <div className='container mt-3'>
          <div className='input-group'>
            <input
              style={{ paddingLeft: '10px' }}
              className='form-control py-2'
              name='searchText'
              type='text'
              placeholder='Search...'
              value={text}
              onChange={this.handleOnChange}
            />
            <span className='input-group-append'>
              <div className='input-group-text'>
                <i className='fa fa-search' />
              </div>
            </span>
          </div>
        </div>
        {noFilteredResults
          ? <h1>No results found.</h1>
          : <div className='recipe-list'>
            {filteredRecipes.length
              ? filteredRecipes.map((recipe, index) =>
                <Link
                  style={{ textDecoration: 'none' }}
                  key={index}
                  to={`/recipes/${recipe.id}`}>
                  <RecipeCard key={index} recipe={recipe} />
                </Link>)
              : recipes.map((recipe, index) =>
                <Link
                  style={{ textDecoration: 'none' }}
                  key={index}
                  to={`/recipes/${recipe.id}`}>
                  <RecipeCard key={index} recipe={recipe} />
                </Link>)}
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
