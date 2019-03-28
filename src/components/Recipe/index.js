import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from '../Firebase'

import './index.css'

class Recipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      title: '',
      image: '',
      description: '',
      ingredients: [],
      instructions: '',
      preptime: '',
      mealTypes: []
    }
  }

  componentDidMount () {
    this.getRecipe()
  }

  getRecipe = () => {
    const RECIPE_ID = this.props.match.params.id

    if (RECIPE_ID) {
      this.props.firebase
        .singleRecipe(RECIPE_ID)
        .once('value', snapshot => {
          if (snapshot.val()) {
            const {
              title,
              image,
              description,
              ingredients,
              instructions,
              preptime,
              mealTypes
            } = snapshot.val()

            this.setState({
              loading: false,
              title,
              image,
              description,
              ingredients,
              instructions,
              preptime,
              mealTypes
            })
          }
        })
    }
  }

  render () {
    const {
      loading,
      title,
      image,
      description,
      ingredients,
      instructions,
      preptime,
      mealTypes
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
        </div>
        <div>
          <p>{description}</p>
          <p>{instructions}</p>
          <p> Ingredients:{' '}
            {ingredients.map((ingredient, index) =>
              <span key={index} className='recispane-ingredients'>{ingredient}</span>
            )}
          </p>
          <p>{preptime} minutes preptime</p>
          <p> Meal Type:{' '}
            {mealTypes.map((type, index) =>
              <span key={index} className='recispane-ingredients'>{type}</span>
            )}
          </p>
        </div>
      </div>
    )
  }
}

Recipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  firebase: PropTypes.shape({
    singleRecipe: PropTypes.func
  })
}

export default withFirebase(Recipe)
