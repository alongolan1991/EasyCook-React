import React from 'react';  
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import Icon from '../../components/Icon';
import api from '../../services/api.services';


const RecipeItem = ({recipe, userid, reverse, onFavoritesClick, onIconClick = () => {}, onRecipeClick }) => {
  const imgCol = (
      <div className="grid-col img-col">
        <img src={recipe.image} className="recipe-image"/>
        <span onClick={(e) => { e.stopPropagation(); onIconClick(recipe.category)}} className={`category-icon ${reverse ? 'right' : 'left'}`}>
         <Icon name={recipe.category} />
        </span>
      </div>
  );


  const textCol = (
    <div className="grid-col text-col">
        <div onClick={(e) => {e.stopPropagation(); onFavoritesClick(userid, recipe._id)}}>
        <Icon weight="bold" size="30px" name="empty-bm" />
        </div>
        <p>{recipe.name}</p>
        <div className="icon-div">
          <LabeledIcon iconName="calories" text={`${recipe.calories} cal`} />
          <LabeledIcon iconName="clock" text={`${recipe.preparation_time} min`} />
          <LabeledIcon iconName="ingredients" text={`${recipe.ingredients.length} ingr`} />
        </div>
      </div>
  );

  return (
    <div className="grid-row" onClick={() => onRecipeClick(recipe._id, recipe.category)}>
      {reverse ? [textCol, imgCol] : [imgCol, textCol]}     
    </div>
  );
}

export default RecipeItem;
