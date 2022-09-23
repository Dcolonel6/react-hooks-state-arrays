import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [selectedCuisine,setCuisine] = useState("All")

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    setFoods(currentFood => {
      return [
        ...currentFood,
        newFood
      ]
    })
  }
  function handleChange(evnt){
    const {target} = evnt
    setCuisine(target.value)
  }
  function handleLiClick(foodId){
    setFoods(currentFoods => {
      return currentFoods.filter(({id})=>{
        return id !== foodId
      })
    })
    
  }
  function handleMouseOverLi (foodId){
    setFoods(currentFood => {
      return currentFood.map(food => {
        return food.id === foodId ? {...food,heatLevel:food.heatLevel +1 } : food
      })    

    })

  }
  const foodsToDisplay = foods.filter(({cuisine}) => {
    return selectedCuisine === 'All' ? true : cuisine === selectedCuisine
  })

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} 
      onClick={() => handleLiClick(food.id)}
      onMouseOver = {() => handleMouseOverLi(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  return (
    <div>
      <select name="filter" onChange={handleChange} value={selectedCuisine}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
