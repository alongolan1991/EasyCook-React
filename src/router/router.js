import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Favorites from '../pages/favorites/Favorites';
import Recipes from '../pages/recipes/RecipesList';
import SingleRecipe from '../pages/single-recipe/SingleRecipe';
import Login from '../../src/pages/login/login';

const ReactRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/home/:id/:name" component={Recipes} />
                <Route  path="/login" component={Login} />
                <Route path="/favorites/:id" component={Favorites} />
                <Route path="/recipe/:recipeid/:userid" component={SingleRecipe} />
            </Switch>
        </Router>
    );
}

export default ReactRouter;
