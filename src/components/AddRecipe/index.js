import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

const condition = authUser => !!authUser

const INITIAL_STATE = {
  title: '',
  description: '',
  image: '',
  ingredients: [],
  instructions: '',
  meal: '',
  preptime: ''
}

class AddRecipe extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()

    const id = Date.now()

    const USER_ID = this.props.userId

    let newRecipes = {}

    newRecipes[id] = { ...this.state }

    this.props.firebase
      .userRecipes(USER_ID)
      .once('value', snapshot => {
        let userRecipes = snapshot.val()

        if (userRecipes) {
          newRecipes = Object.assign(newRecipes, userRecipes)
        }

        this.props.firebase
          .userRecipes(USER_ID)
          .set({ ...newRecipes })
          .then(() => {
            this.props.firebase
              .recipes()
              .once('value', snapshot => {
                let recipes = snapshot.val()

                if (recipes) {
                  recipes = Object.assign(newRecipes, recipes)
                }

                this.props.firebase
                  .recipes()
                  .set({ ...newRecipes })
                  .then(() => {
                    this.setState({ ...INITIAL_STATE })
                    this.props.history.push('/recipes')
                  })
              })
          })
      })
  }

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
                  placeholder='Healthy eggs'
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
                  placeholder='Fried eggs with beans and spinach, topped with salsa and hot sauce'
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
                  placeholder='Add oil and spinach to a frying pan. Once the spinach has started shrivelling up, break your desired number of eggs into the frying pan. Soon after, add beans. Once cooked, top with salsa and hot sauce.'
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
                  placeholder='eggs, spinach, salsa, hot sauce, beans'
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
                  placeholder='25'
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
                  placeholder='https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg'
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
  userId: PropTypes.string,
  firebase: PropTypes.shape({
    userRecipes: PropTypes.func,
    recipes: PropTypes.func
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default withAuthorization(condition)(AddRecipe)
