import React, { Component } from 'react'
import RecipeCard from '../RecipeCard'
import axios from 'axios'
import { Form, Input, Button } from 'reactstrap'
const apiId = process.env.REACT_APP_API_ID
const apiKey = process.env.REACT_APP_API_KEY

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
    axios.get(`https://api.edamam.com/search?q=${this.state.searchText}&app_id=${apiId}&app_key=${apiKey}`)
      .then(response => {
        this.setState({
          recipes: response.data.hits
        })
      })
      .catch(error => console.log('Error', error))
  }

  render () {
    return (
      <div>
        <Form
          onSubmit={this.find}
          className='searchbar'>
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
          {this.state.recipes.map((recipe, index) =>
            <RecipeCard key={index} recipe={recipe.recipe} />
          )}
        </div>
      </div>
    )
  }
}

export default Search
