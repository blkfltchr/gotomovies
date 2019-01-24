import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import './index.css'

const condition = authUser => !!authUser

const INITIAL_STATE = {
  loading: true,
  title: '',
  description: '',
  image: '',
  ingredients: [],
  instructions: '',
  meal: '',
  preptime: ''
}

class SingleRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  componentDidMount () {
    const userId = this.props.userId
    const recipeId = this.props.match.params.id

    this.props.firebase
      .userRecipes(userId)
      .once('value', snapshot => {
        const singleRecipe = snapshot.val()
          .filter(recipe => recipe.id === recipeId)[0]

        const {
          description,
          image,
          ingredients,
          instructions,
          meal,
          preptime,
          title
        } = singleRecipe

        this.setState({
          description,
          image,
          ingredients,
          instructions,
          meal,
          preptime,
          title,
          loading: false
        })
      })
  }

  render () {
    const {
      loading,
      title,
      description,
      image,
      ingredients,
      instructions,
      meal,
      preptime
    } = this.state

    if (loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className='recipe-card'>
        <div className='flex-wrapper'>
          <img src={image} alt={title} className='recipe-image' />
        </div>

        <div className='delete-flex'>
          <h3>{title}</h3>
          <div>
            <i className='far fa-edit fa-2x' />
            <i className='far fa-trash-alt fa-2x delete-icon' />
          </div>
        </div>

        <div>
          <h5 className='recipe-description'>{description}</h5>
          <h5 className='recipe-instructions'>{instructions}</h5>
          {ingredients.map((index, ingredient) =>
            <h5 key={index} className='recipe-ingredients'>{ingredient}</h5>
          )}
          <h5 className='recipe-preptime'>{preptime}</h5>
          <h5 className='recipe-meail'>{meal}</h5>
        </div>

        <div className='modal fade'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'>
                  &times;
                </button>
                <h4 className='modal-title'>Confirm Delete</h4>
              </div>
              <div className='modal-body'>
                <p>Are you sure you want to delete?</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-default'
                  data-dismiss='modal'>
                  Yes
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-dismiss='modal'>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SingleRecipe.propTypes = {
  userId: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  firebase: PropTypes.shape({
    userRecipes: PropTypes.func
  })
}

export default withAuthorization(condition)(SingleRecipe)
