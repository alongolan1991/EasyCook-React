import React from 'react';
import Header from '../../components/Header';
import { withRouter } from 'react-router-dom';
import api from '../../services/api.services';
import RecipeItem from '../recipes/RecipeItem'
import Icon from '../../components/Icon';




class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.match.params.id,
      recipes: [],
      status: 'Loading'
    };

  }

  componentWillMount() {
    api.getFavorites(this.state.userID)
      .then(response => {
        console.log(response);
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





  render() {
    const header = (
      <Header display={'block'}>
        <button onClick={() => this.props.history.push(`/${this.state.userID}`)}><Icon name="arrow" /></button>
        <h3>My Collection</h3>
      </Header>
    )
    if (this.state.status === 'Loading') {
    return [header, <div> Loading..</div>];
     }
    else if (this.state.status === 'Empty') {
      return [header, <div style={{textAlign: 'center'}}>
          <h2>Your recipes</h2>
          <p>You can save here your favorite recipes and watch them later.</p>
        </div>]
        }
    
        return (
      <div>
          <Header display={'block'}>
            <button onClick={() => this.props.history.push(`/${this.state.userID}`)}><Icon name="arrow" /></button>
            <h3>My Collection</h3>
          </Header>
          <div>
            {this.state.recipes.map((recipe, index) => {
              const reverse = index % 2 === 1;
              return <RecipeItem key={recipe._id} reverse={reverse} recipe={recipe} />
            })}
          </div>
        </div>
        );
      }
    }
    
    
export default withRouter(Favorites);