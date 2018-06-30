import React from 'react';
import Header from '../../components/Header';
// import Single_recipe from '../../components/Single-recipe';
import cart from '../../sketch/cart.svg';
import clock from '../../sketch/clock.svg';
import ing_num from '../../sketch/ing_num.svg';
import calories from '../../sketch/calories.svg';
import favorites from '../../sketch/favorites.svg';
import small_logo from '../../sketch/easy-logo-small.svg';
import './recipes.css';
import axios from 'axios';
import pic from '../../media/chicken/Baked Buffalo Wings/image/Baked Buffalo Wings.jpg';



export default class Recipes extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        userID: props.match.params.id,
        recipes:[],

      };
    }



componentWillMount(){
  axios.post('http://localhost:3000/getUserRecipesByStatistics', {
          userID: this.state.userID,
      })
      .then(response => {
        console.log(response);
        this.setState({
          recipes:response.data
        })
      })
      .catch(error => {
        console.log(error);
      });


}

    // fetch('https://easy-cook-server.herokuapp.com/getUserRecipesByStatistics', {
    //   method: 'POST',
    //   body: JSON.stringify(this.state.userID),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(res => res.json())
    // .then(res => {
    //   console.log(res);
    //   this.setState({recipes: res});
    // })
    // }






  render(){
    // const image = require('../../media/vegetarian/Healthy Veggies and Couscous/image/Healthy Veggies and Couscous.jpg');
    if (this.state.recipes.length === 0) {
      return <div>Loading...</div>;
    }
    console.log(this.state.recipes[0].image);
    return(
      <div>
        <Header>
         <button><img src={favorites}/></button>
         <button><img src={small_logo}/></button>
         <button><img src={cart}/></button>
        </Header>
        <div className="grid">

          {/* <GridRow recipe={recipe} reverse={reverse}/> */}
          {this.state.recipes.map((recipe, index) => {
              const reverse = index % 2 === 1;
              if(reverse){
                return (
                  <div key={recipe._id} className="grid-row">
                    <div className="grid-col img-col" >
                      <img src={recipe.image} style={{height: '100%' , width: '100%'}}/>
                    </div>
                    <div className="grid-col text-col">
                      <img src={favorites} style={{width: '20px'}}/>
                      <p>{recipe.name}</p>
                    <div style={{display : 'flex' , justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                          <img src={calories} style={{width: '20px'}}/>
                        <p className="icons">{recipe.calories} cal</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                          <img src={clock} style={{width: '26.5px'}}/>
                        <p className="icons">{recipe.preparation_time} min</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                          <img src={ing_num} style={{width: '20px'}}/>
                        <p className="icons">{recipe.ingredients.length} ingr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              else{
                return (
                  <div key={recipe._id} className="grid-row">

                    <div className="grid-col text-col">
                      <img src={favorites} style={{width: '20px'}}/>
                      <p>{recipe.name}</p>
                    <div style={{display : 'flex' , justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                          <img src={calories} style={{width: '20px'}}/>
                        <p className="icons">{recipe.calories} cal</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                          <img src={clock} style={{width: '26.5px'}}/>
                        <p className="icons">{recipe.preparation_time} min</p>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                          <img src={ing_num} style={{width: '20px'}}/>
                        <p className="icons">{recipe.ingredients.length} ingr</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid-col img-col" >
                      <img src={recipe.image} style={{height: '100%' , width: '100%'}}/>
                    </div>
                  </div>
                );
              }

          })}


        </div>


      </div>


    );
  }
}
