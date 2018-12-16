import React, { Component } from 'react'
import RecipeCard from '../recipes/RecipeCard'
import axios from 'axios'
import { Form, Input, Button } from 'reactstrap'

class Search extends Component {
  constructor () {
    super()
    this.state = {
      searchText: ''
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  find = (event) => {
    axios.post(`https://api.edamam.com/search?q=${this.state.searchText}&app_id=e8e8b56e&app_key=be2248e2f3aac475b0727f4d57f53f4c`)
  }

  render () {
    return (
      <div>
        <Form action={this.find} className='searchbar'>
          <Input
            name='searchText'
            type='text'
            placeholder='Search'
            value={this.state.searchText}
            onChange={this.handleOnChange}
          />
          <Button>Find</Button>
        </Form>
        <div className='recipe-list'>
          {this.state.recipes.map(recipe => {
            if (
              recipe.ingredients
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            ) {
              return <RecipeCard recipe={recipe} key={recipe.id} />
            } else {
              return null
            }
          })}
        </div>
      </div>
    )
  }
}

export default Search
