import React from 'react';
import Header from '../../components/Header';
import small_logo from '../../sketch/easy-logo-small.svg';
import './recipes.css';
import axios from 'axios';
import pic from '../../media/chicken/Baked Buffalo Wings/image/Baked Buffalo Wings.jpg';
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import RecipeItem from './RecipeItem';
import api from '../../services/api.services';
import Icon from '../../components/Icon';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import {NotificationContainer, NotificationManager} from 'react-notifications';




class RecipesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.match.params.id,
      name: props.match.params.name,
      recipes: [],
      filterBy: ''
    };

    this.filterByCategory = this.filterByCategory.bind(this);
    this.getRecipeByStatistics = this.getRecipeByStatistics.bind(this);
    this.navigateToRecipePage = this.navigateToRecipePage.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
  }

  

  componentWillMount() {
    this.getRecipeByStatistics();
  }

  getRecipeByStatistics() {
    api.getUserRecipesByStatistics(this.state.userID)
      .then(response => {
        console.log(response);
        this.setState({
          recipes: response.data,
          filterBy: "",
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  addToFavorites(userid, recipeid){
    api.addFavorites(userid, recipeid)
    .then(response => {
      console.log(response);
      if(response.data.message == 'recipe already exsits in favorites')
      NotificationManager.warning(response.data.message);
      else
      NotificationManager.success(response.data.message);
    })
    .catch(error => {
      console.log(error);
    });

  }


  navigateToRecipePage(recipeID, category) {
    console.log(category);
    api.setStatistics(this.state.userID , category)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });



    this.props.history.push(`/recipe/${recipeID}/${this.state.userID}/${this.state.name}`)
  }

  filterByCategory(categoryName) {
    if (categoryName === this.state.filterBy) {
      return;
    }
    api.getRecipeByCategory(categoryName)
      .then(response => {
        console.log(response);
        this.setState({
          recipes: response.data,
          filterBy: categoryName,
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.recipes.length === 0) {
      return <div>Loading...</div>;
    }
    console.log(this.state.recipes[0].image);
    return (
      <div>
        <Header>
          <button onClick={() => this.props.history.push(`/favorites/${this.state.userID}/${this.state.name}`)}><Icon weight="bold" size="30px" name="empty-bm" /></button>
          <button><img src={small_logo} /></button>
          <button><Icon  size="30px" name="cart" /></button>
        </Header>
        <div className="recipes-list">
          {this.state.recipes.map((recipe, index) => {
            const reverse = index % 2 === 1;
            return <RecipeItem key={recipe._id} userid={this.state.userID} reverse={reverse} onFavoritesClick={this.addToFavorites} onRecipeClick={this.navigateToRecipePage} onIconClick={this.filterByCategory} recipe={recipe} />
          })}
        </div>
        {this.state.filterBy && (
          <span onClick={this.getRecipeByStatistics} className="main-category">
            <Icon name="square" />
          </span>
        )}
        <NotificationContainer/>
      </div>
    );
  }
}

export default withRouter(RecipesList);