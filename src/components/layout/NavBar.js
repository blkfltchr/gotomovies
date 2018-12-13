import React from "react";

const NavBar = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-light bg-white">
      <a className="navbar-brand" href="/">GoToRecipes</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar">
          <a className="nav-item nav-link active" href="/recipes">My recipes</a>
          <a className="nav-item nav-link active" href="/add">Add a recipe</a>
          <a className="nav-item nav-link active" href="/search"><i className="fas fa-search" /></a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
