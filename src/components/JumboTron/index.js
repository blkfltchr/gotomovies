import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'

const JumboTron = () => {
  return (
    <div className='jumbo-background'>
      <div className='jumbo-text'>
        <h1 className='display-3'>Track your favourite recipes.</h1>
        <p className='lead'>No more forgetting, no more searching, no more indecision.</p>
        <p className='lead'>My go-to recipes helps you cook great meals for breakfast, lunch, and dinner.</p>
        <p className='lead'>
          <Link
            to='/recipes'>
            <button className='btn btn-primary'>
            Browse recipes
            </button>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default JumboTron
