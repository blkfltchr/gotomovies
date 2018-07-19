import React, {Component} from 'react';
import '../App.css'
import { Alert, Button } from 'reactstrap';
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";
import Modal from "react-modal";
import RecipeForm from './RecipeForm';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

class SingleRecipe extends Component {
    constructor(props) {
        super(props);
        this.state= {
            recipe: null,
            title: "",
            description: "",
            meal: "",
            instructions: "",
            ingredients: "",
            image: "",
            preptime: "",
            edit: false,
            deleted: false,
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
      }
    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = "#f00";
      }
    
      closeModal() {
        this.setState({ modalIsOpen: false });
      }

      componentDidMount() {
        const id = this.props.match.params.id;
        axios
          .get(`http://localhost:5555/recipes/${id}`)
          .then(res => {
            console.log(res.data);
            this.setState({
              recipe: res.data,
              title: res.data.title,
              description: res.data.description,
              meal: res.data.meal,
              instructions: res.data.instructions,
              ingredients: res.data.ingredients,
              image: res.data.image,
              preptime: res.data.preptime
            });
          })
          .catch(err => {
            console.log(err);
          });
      }

      editRecipe = () => {
        this.setState({ edit: true });
      };

      deleteRecipe = () => {
        axios
          .delete(`http://localhost:5555/recipes/${this.state.recipe.id}`)
          .then(response => {
            console.log('Deleting!', response);
            this.setState({ deleted: true });
          })
          .catch(error => console.log(error));
      }
  render() {
  return this.state.deleted ? (
      <Redirect to="/recipes" />
  ) : this.state.edit ? (
      <RecipeForm
        edit={true}
        recipe={this.state.recipe}
        title={this.state.title}
        description={this.state.description}
        meal={this.state.meal}
        instructions={this.state.instructions}
        ingredients={this.state.ingredients}
        image={this.state.image}
        preptime={this.state.preptime} />
  ) : (
    <div>
    <div className="recipe-card">
      <div className="flex-wrapper">
        <div>
          <img src={this.state.image} alt={this.state.title} className="recipe-image" />
        </div>
        <div>
          <div className="delete-flex">
            <h3>{this.state.title}</h3>
            <div>
            {/* <i class="far fa-edit fa-2x" onClick={this.editRecipe}></i> */}
            <i class="far fa-trash-alt fa-2x" onClick={this.openModal}></i>
            </div>
          </div>
          <p className="recipe-description">{this.state.description}</p>
          <h5>Instructions</h5>
          <p className="recipe-instructions">{this.state.instructions}</p>
          <h5>Ingredients</h5>
          <p className="recipe-ingredients">{this.state.ingredients}</p>
          <h5>Preptime</h5>
          <p className="recipe-preptime">{this.state.preptime}</p>
        </div>
      </div>
      <Alert color="info">
        This meal is intended for <strong>{this.state.meal}</strong> but rules are meant to
        be broken.
      </Alert>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <h2 ref={subtitle => (this.subtitle = subtitle)}>
              Are you sure you want to delete this?
            </h2>
            <Button onClick={this.deleteRecipe} className="margin-right">Yes, delete this recipe.</Button>
            <Button onClick={this.closeModal}>No, keep it.</Button>
          </div>
        </Modal>
    </div>
    <Link to="/recipes"><div className="searchbar">View all the recipes...</div></Link>
    </div>
    )
  ;
}
}

export default SingleRecipe;

