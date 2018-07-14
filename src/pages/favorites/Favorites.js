import React from 'react';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import api from '../../services/api.services';
import RecipeItem from '../recipes/RecipeItem'
import Icon from '../../components/Icon';
import idGenerator from 'react-id-generator';


class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.match.params.id,
      name: props.match.params.name,
      recipes: [],
      status: 'Loading',
      check: true,
    };

    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.navigateToRecipePage = this.navigateToRecipePage.bind(this);
  }

  componentWillMount() {
    this.getFavorites();
  }

  navigateToRecipePage(recipeID, category) {
    api.setStatistics(this.state.userID , category)
    .then(response => {
      this.props.history.push(`/recipe/${recipeID}/${this.state.userID}/${this.state.name}`)
    })
    .catch(error => {
      console.log(error);
    });

  }

  getFavorites() {
    api.getFavorites(this.state.userID)
      .then(response => {
        if (response.data.message) {
          this.setState({
            status: "Empty"
          });
        }
        else {
          this.setState({
            recipes: response.data,
            status: 'Success'
          })
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  deleteFromFavorites(userid, recipeid) {
    api.deleteFavorites(userid, recipeid)
      .then(response => {
        this.getFavorites();
      })
      .catch(error => {
        console.log(error);
      });

  }


  render() {
    const header = (
      <Header display={'block'}>
        <button onClick={() => this.props.history.push(`/2017-2018/dcs/dev_176/easy-cook-app/home/${this.state.userID}/${this.state.name}`)}><Icon name="arrow" /></button>
        <h3>My Collection</h3>
      </Header>
    )
    if (this.state.status === 'Loading') {
      return [header, <div> Loading..</div>];
    }
    else if (this.state.status === 'Empty') {
      return [header, <div style={{ textAlign: 'center' }}>
        <h2>Your recipes</h2>
        <p>You can save here your favorite recipes and watch them later.</p>
      </div>]
    }

    return (
      <div>
        <Header display={'block'}>
          <button onClick={() => this.props.history.push(`/2017-2018/dcs/dev_176/easy-cook-app/home/${this.state.userID}/${this.state.name}`)}><Icon name="arrow" /></button>
          <h3>My Collection</h3>
        </Header>
        <div>
          {this.state.recipes.map((recipe, index) => {
            const reverse = index % 2 === 1;
            return <RecipeItem key={idGenerator()} userid={this.state.userID} onRecipeClick={this.navigateToRecipePage} onFavoritesClick={this.deleteFromFavorites} reverse={reverse} recipe={recipe} />
          })}
        </div>
      </div>
    );
  }
}


export default withRouter(Favorites);