import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const RecipeJumbotron = () => {
  return (
    <div className="jumbo-background">
    <div className="jumbo-text">
        <h1 className="display-3">Track your favourite recipes.</h1>
        <p className="lead">No more forgetting, no more searching, no more indecision.</p>
        <p className="lead">My go-to recipes helps you cook great meals for breakfast, lunch, and dinner.</p>
        <p className="lead">
          <Button tag={Link} to="/recipes" color="primary">Browse recipes</Button>
        </p>
        </div>
        <Button tag={Link} to="/about" className="about">How I built this</Button>
    </div>
  );
};

export default RecipeJumbotron;