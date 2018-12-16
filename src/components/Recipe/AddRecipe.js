import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import '../../App.css'

class AddRecipe extends Component {
  constructor () {
    super()
    this.state = {
      label: '',
      image: null,
      source: '',
      url: '',
      ingredients: ''
    }
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addRecipe = event => {
    event.preventDefault()
    const newRecipe = Object.assign({}, this.state)
    axios
      .post('http://localhost:5555/recipes', newRecipe)
      .then(() => {
        this.setState({
          image: null,
          label: '',
          source: '',
          url: '',
          ingredients: []
        })
      })
      .catch(error => console.log('Error', error))
  }

  render () {
    return (
      <div className='background'>
        <div className='form-container'>
          <Form onSubmit={this.addRecipe}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                name='label'
                type='text'
                placeholder='Title'
                value={this.state.label}
                onChange={this.handleOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ingredients</Label>
              <Input
                name='ingredients'
                type='text'
                placeholder='Ingredients'
                value={this.state.ingredients}
                onChange={this.handleOnChange}
              />
              <FormText color='muted'>
                Please list your ingredients seperated by a 'comma'.
              </FormText>
            </FormGroup>
            <Button>Add Recipe</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default AddRecipe
