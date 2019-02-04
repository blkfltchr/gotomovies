import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'

class RecipeAuth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid: props.uid,
      rid: props.rid,
      title: props.recipe.title,
      description: props.recipe.description,
      image: props.recipe.image,
      instructions: props.recipe.instructions,
      meal: props.recipe.meal,
      preptime: props.recipe.preptime
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  updateRecipe = () => {
    const {
      uid,
      rid,
      ...userRecipeData
    } = this.state

    this.props.firebase
      .singleRecipe(rid)
      .update({
        uid,
        ...userRecipeData
      })
      .then(() => {
        this.props.firebase
          .singleUserRecipe(uid, rid)
          .update({ ...userRecipeData })
          .then(() => {
            this.props.history.push('/recipes')
          })
          .catch(() => {
            console.log('Error updating recipe.')
          })
      })
  }

  render () {
    const {
      title,
      description,
      image,
      // ingredients,
      instructions,
      meal,
      preptime
    } = this.state

    return (
      <div className='recipe-card'>
        <div className='flex-wrapper'>
          <img src={image} alt={title} className='recipe-image' />
        </div>

        <div className='delete-flex'>
          <input
            name='title'
            type='text'
            value={title}
            onChange={this.handleOnChange}
          />
          <div>
            <i className='far fa-edit fa-2x' onClick={this.updateRecipe} />
            <i className='far fa-trash-alt fa-2x delete-icon' />
          </div>
        </div>

        <div>
          <input
            name='description'
            type='text'
            value={description}
            onChange={this.handleOnChange}
          />
          <input
            name='instructions'
            type='text'
            value={instructions}
            onChange={this.handleOnChange}
          />
          {/* <p> Ingredients:{' '}
            {ingredients.map((ingredient, index) =>
              <span key={index} className='recispane-ingredients'>
                <input
                  name='ingredient'
                  type='text'
                  value={ingredient}
                />,
              </span>
            )}
          </p> */}
          <input
            name='preptime'
            type='text'
            value={preptime}
            onChange={this.handleOnChange}
          />
          <input
            name='meal'
            type='text'
            value={meal}
            onChange={this.handleOnChange}
          />
        </div>
      </div>
    )
  }
}

RecipeAuth.propTypes = {
  uid: PropTypes.string,
  rid: PropTypes.string,
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.array,
    instructions: PropTypes.string,
    meal: PropTypes.string,
    preptime: PropTypes.string
  }),
  firebase: PropTypes.shape({
    singleRecipe: PropTypes.func,
    singleUserRecipe: PropTypes.func
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default compose(
  withRouter,
  withFirebase
)(RecipeAuth)
