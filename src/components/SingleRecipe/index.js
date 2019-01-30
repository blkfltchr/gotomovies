import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import './index.css'

const condition = authUser => !!authUser

const INITIAL_STATE = {
  title: '',
  description: '',
  image: '',
  ingredients: [],
  instructions: '',
  meal: '',
  preptime: '',
  loading: true
}

class SingleRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  componentDidMount () {
    const USER_ID = this.props.userId
    const RECIPE_ID = this.props.match.params.id

    this.props.firebase
      .singleRecipe(USER_ID, RECIPE_ID)
      .once('value', snapshot => {
        const {
          description,
          image,
          ingredients,
          instructions,
          meal,
          preptime,
          title
        } = snapshot.val()

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
      title,
      description,
      image,
      ingredients,
      instructions,
      meal,
      preptime,
      loading
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
          {/* <div>
            <i className='far fa-edit fa-2x' />
            <i className='far fa-trash-alt fa-2x delete-icon' />
          </div> */}
        </div>

        <div>
          <p>{description}</p>
          <p>{instructions}</p>
          <p> Ingredients:{' '}
            {ingredients.map((ingredient, index) =>
              <span key={index} className='recispane-ingredients'>{ingredient}, </span>
            )}
          </p>
          <p>{preptime} minutes preptime</p>
          <p>{meal}</p>
        </div>

        {/* <div className='modal fade'>
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
        </div> */}
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
    singleRecipe: PropTypes.func
  })
}

export default withAuthorization(condition)(SingleRecipe)
