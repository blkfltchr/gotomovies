import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

const Header = () => {
  return (
    <div className="nav-background">
      <div className="nav-flex">
        <div>
          <h2 className="no-decoration">
            <StyledLink to="/">My go-to recipes.</StyledLink>
          </h2>
        </div>
        <div className="flex-wrapper">
          <NavLink className="push" to="/recipes">
            My recipes
          </NavLink>
          <NavLink to="/add">Add a recipe</NavLink>
          <Link to="/search">
            <i class="fas fa-search" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
