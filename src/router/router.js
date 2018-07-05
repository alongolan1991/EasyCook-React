import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Favorites from '../pages/favorites/Favorites';
import Recipes from '../pages/recipes/RecipesList';

const ReactRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/favorites" component={Favorites} />
                <Route path="/:id" component={Recipes} />
            </Switch>
        </Router>
    );
}

export default ReactRouter;
