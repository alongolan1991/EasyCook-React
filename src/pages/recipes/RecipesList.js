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




class RecipesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.match.params.id,
      recipes: [],
      filterBy: ''
    };

    this.filterByCategory = this.filterByCategory.bind(this);
    this.getRecipeByStatistics = this.getRecipeByStatistics.bind(this);

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
          <button onClick={() => this.props.history.push(`/favorites/${this.state.userID}`)}><Icon name="favorites" /></button>
          <button><img src={small_logo} /></button>
          <button><Icon name="cart" /></button>
        </Header>
        <div className="recipes-list">
          {this.state.recipes.map((recipe, index) => {
            const reverse = index % 2 === 1;
            return <RecipeItem key={recipe._id} reverse={reverse} onIconClick={this.filterByCategory} recipe={recipe} />
          })}
        </div>
        {this.state.filterBy && (
          <span onClick={this.getRecipeByStatistics} className="main-category">
            <Icon name="square" />
          </span>
        )}
        }
      </div>
    );
  }
}

export default withRouter(RecipesList);