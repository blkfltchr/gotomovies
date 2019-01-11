import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class RecipePage extends Component {
  render () {
    const { recipe } = this.props

    if (recipe) {
      return (
        <div>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.description}</p>
          <p>{recipe.instructions}</p>
          <p>{recipe.ingredients}</p>
          <p>{recipe.preptime}</p>
          <p>{recipe.meal}</p>
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

RecipePage.propTypes = {
  recipe: PropTypes.object
}

export default compose(firestoreConnect(props =>
  [ { collection: 'recipes', storeAs: 'recipe', doc: props.match.params.id } ]),
connect(({ firestore: { ordered } }) =>
  ({ recipe: ordered.recipe && ordered.recipe[0]
  }))
)(RecipePage)
