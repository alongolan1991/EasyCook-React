import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Favorites from '../pages/favorites/Favorites';
import Recipes from '../pages/recipes/RecipesList';
import SingleRecipe from '../pages/single-recipe/SingleRecipe';
import Login from '../../src/pages/login/login';
import Redirect from "react-router-dom/Redirect";


const ReactRouter = () => {
    return (
        <Router basename={'/2017-2018/dcs/dev_176/easy-cook-app'}>
            <Switch>
                <Route path={`/login`} component={Login} />
                <Route path={`/home/:id/:name`} component={Recipes} />
                <Route path={`/favorites/:id/:name`} component={Favorites} />
                <Route path={`/recipe/:recipeid/:userid/:name`} component={SingleRecipe} />
                <Redirect from ={`/`} to={`/login`}/>
            </Switch>
        </Router>
    );
}

export default ReactRouter;
