import React from 'react';
import ing_num from '../../sketch/ing_num.svg';
import calories from '../../sketch/calories.svg';
import favorites from '../../sketch/favorites.svg';
import clock from '../../sketch/clock.svg';
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import Icon from '../../components/Icon'


const RecipeItem = ({recipe, reverse, onIconClick}) => {
  const imgCol = (
      <div className="grid-col img-col">
        <img src={recipe.image} className="recipe-image" />
        <span onClick={() => onIconClick(recipe.category)} className={`category-icon ${reverse ? 'right' : 'left'}`}>
         <Icon name={recipe.category} />
        </span>
      </div>
  );

  const textCol = (
    <div className="grid-col text-col">
        <img src={favorites} style={{ width: '20px' }} />
        <p>{recipe.name}</p>
        <div className="icon-div">
          <LabeledIcon iconName="calories" text={`${recipe.calories} cal`} />
          <LabeledIcon iconName="clock" text={`${recipe.preparation_time} min`} />
          <LabeledIcon iconName="ingredients" text={`${recipe.ingredients.length} ingr`} />
        </div>
      </div>
  );

  return (
    <div className="grid-row">
      {reverse ?  [textCol, imgCol]:[imgCol, textCol]}     
    </div>
  );
}

export default RecipeItem;
