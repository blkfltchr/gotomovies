import React, { Component } from 'react'
import RecipeCard from '../RecipeCard'

class Search extends Component {
  constructor () {
    super()
    this.state = {
      recipes: [],
      searchText: ''
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  find = (event) => {
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <form
          onSubmit={this.find}
          className='searchbar'>
          <input
            name='searchText'
            type='text'
            placeholder='Search'
            value={this.state.searchText}
            onChange={this.handleOnChange}
          />
          <button>Find</button>
        </form>
        <div className='recipe-list'>
          {this.state.recipes.map((recipe, index) =>
            <RecipeCard key={index} recipe={recipe.recipe} />
          )}
        </div>
      </div>
    )
  }
}

export default Search
