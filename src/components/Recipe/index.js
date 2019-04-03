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
      preptime: ''
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
      preptime
    } = this.state

    if (loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className='recipe-card'>
        <div className='recipe-header'>
          <div className='recipe-header-left'>
            <h3 className='recipe-title'>{title}</h3>
            <div className='preptime'>
              <h5>Prep</h5>
              <h5>{preptime} MIN</h5>
            </div>
          </div>
          <img
            className='recipe-image'
            src={image}
            alt={title} />
        </div>

        <div className='recipe-description'>{description}</div>

        <div className='recipe-ingredients'>
          <h4>Ingredients</h4>
          {ingredients.map((ingredient, index) =>
            <span
              className='ingredient'
              key={index}>
              {ingredient}
            </span>
          )}
        </div>

        <div className='recipe-instructions'>
          <h4>Instructions</h4>
          <p>{instructions}</p>
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
