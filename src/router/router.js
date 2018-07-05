import React from "react";
import { Route } from "react-router-dom";
// import Header from "../Header";
import Recipes from '../pages/recipes/RecipesList';

const ReactRouter =()=>{
    return (
        <React.Fragment>
            {/* <Header /> */}
          <Route exact path="/:id" component={Recipes} />
          {/* <Route  path="/BookByID" component={} /> */}
            {/* <Route  path="/BookBy2Params" component={} /> */}
        </React.Fragment>
    );}

export default ReactRouter;
