import React from 'react';
import ing_num from '../../sketch/ing_num.svg';
import calories from '../../sketch/calories.svg';
import favorites from '../../sketch/favorites.svg';
import clock from '../../sketch/clock.svg';
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';


const RecipeItem = ({recipe, reverse, onIconClick}) => {
  const imgCol = (
      <div className="grid-col img-col">
        <img src={recipe.image} className="recipe-image" />
        <span onClick={() => onIconClick(recipe.category)} className="category-icon">
          click
        </span>
      </div>
  );

  const textCol = (
    <div className="grid-col text-col">
        <img src={favorites} style={{ width: '20px' }} />
        <p>{recipe.name}</p>
        <div className="icon-div">
          <LabeledIcon imgSrc={calories} text={`${recipe.calories} cal`} />
          <LabeledIcon imgSrc={clock} text={`${recipe.preparation_time} min`} />
          <LabeledIcon imgSrc={ing_num} text={`${recipe.ingredients.length} ingr`} />
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
