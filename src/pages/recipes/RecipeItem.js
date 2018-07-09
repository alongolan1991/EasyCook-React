import React from 'react';  
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import Icon from '../../components/Icon'


const RecipeItem = ({recipe, reverse, onIconClick = () => {}, onRecipeClick }) => {
  const imgCol = (
      <div className="grid-col img-col">
        <img src={recipe.image} className="recipe-image"/>
        <span onClick={(e) => { e.stopPropagation();onIconClick(recipe.category)}} className={`category-icon ${reverse ? 'right' : 'left'}`}>
         <Icon name={recipe.category} />
        </span>
      </div>
  );

  const textCol = (
    <div className="grid-col text-col">
        <Icon weight="bold" size="30px" name="empty-bm"/>
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
