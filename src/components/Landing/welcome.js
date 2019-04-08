import React from 'react'
import { Link } from 'react-router-dom'

import welcome from '../../assets/welcome.png'
import { SIGNUP } from '../../constants/routes'

const Welcome = () => (
  <div className='container-fluid welcome-container'>
    <div className='row'>
      <div className='col-md-6 align-self-center'>
        <div className='welcome-img'>
          <img className='img-fluid' src={welcome} alt='Welcome' />
        </div>
      </div>
      <div className='col-md-6 align-self-center'>
        <div className='welcome-text mt-5 mt-md-0'>
          <h3>
            <span className='prime-color'>welcome</span>
          </h3>
          <h3>
            to Go<span className='prime-color'>To</span>Recipes
          </h3>
          <p className='pt-3'>Find and share everyday cooking inspirations! Discover recipes, cooks, videos, and how-tos based on the food you love and the friends you follow.</p>
          <p>What's for breakfast, lunch, or dinner? Our delicious suggestions and search functionality makes it easy to answer these age-old questions. We have ideas for chicken, beef, pork, pasta and more.</p>
          <Link to={SIGNUP}>
            <button className='btn btn-warning template-btn'>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default Welcome
