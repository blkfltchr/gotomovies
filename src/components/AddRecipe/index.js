import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class AddRecipe extends Component {
  state = {
    title: '',
    description: '',
    image: '',
    ingredients: [],
    instructions: '',
    meal: '',
    preptime: ''
  }

  onSubmit = e => {
    e.preventDefault()

    const newRecipe = this.state

    const { firestore } = this.props

    firestore
      .add({ collection: 'recipes' }, newRecipe)
      .then(() => this.props.history.push('/recipes'))
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render () {
    return (
      <div style={{ width: '90vw', margin: '2rem auto' }}>
        <div className='row'>
          <Link to='/recipes' className='btn btn-link'>
            <i className='fas fa-arrow-circle-left' />Go Back To My Recipes
          </Link>
        </div>

        <div className='card'>
          <div className='card-header'>Add Recipe</div>
          <div className='card-body'>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  required
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  className='form-control'
                  name='description'
                  required
                  onChange={this.onChange}
                  value={this.state.description}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='instructions'>Instructions</label>
                <input
                  type='text'
                  className='form-control'
                  name='instructions'
                  required
                  onChange={this.onChange}
                  value={this.state.instructions}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='ingredients'>Ingredients <span style={{ fontStyle: 'italic' }}>(seperate with commas and spaces)</span></label>
                <input
                  type='text'
                  className='form-control'
                  name='ingredients'
                  required
                  onChange={this.onChange}
                  onBlur={e => this.setState({ [e.target.name]: e.target.value.split(/[ ,]+/) })}
                  value={this.state.ingredients}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='preptime'>Prep time</label>
                <input
                  type='text'
                  className='form-control'
                  name='preptime'
                  required
                  onChange={this.onChange}
                  value={this.state.preptime}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='meal'>Meal</label>
                <select
                  className='form-control'
                  name='meal'
                  required
                  onChange={this.onChange}
                  value={this.state.meal}>
                  <option value='breakfast'>Breakfast</option>
                  <option value='lunch'>Lunch</option>
                  <option value='dinner'>Dinner</option>
                </select>
              </div>

              <div className='form-group'>
                <label htmlFor='image'>Image</label>
                <input
                  type='text'
                  className='form-control'
                  name='image'
                  required
                  onChange={this.onChange}
                  value={this.state.image}
                />
              </div>

              <input
                type='submit'
                value='Submit'
                className='btn btn-primary btn-block'
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddRecipe.propTypes = {
  firestore: PropTypes.object.isRequired,
  history: PropTypes.object
}

export default AddRecipe
