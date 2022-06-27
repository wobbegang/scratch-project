import React, { useState } from 'react'
function Recipe({ meal }) {
    //const [meal, setMeal] = useState('')
    const newArr= [];
    
    for (let i = 1; i <= 20; i++){
        if (meal[`strIngredient${i}`])
            newArr.push(meal[`strIngredient${i}`])
    }
    //console.log(newArr)
    // console.log(meal.strIngredient1)
    const [review, username,rating, id] = useState('');

    const handleClick = () =>  {
        let databody = {
          strReview: review, strUsername: username, Rating: rating, RecipeId: id
        };
        console.log('clicked');
        fetch('/api/review', {
          method: 'POST',
          body: JSON.stringify(databody),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(function (response) {
            if (response.ok) {
              console.log('Data has been sent to MongoDB');
            } else {
              throw new Error('CLICK FAILED');
            }
          })
          .catch((error) => console.log(error));
      }
      
    return (
        //<div>Recipe Page</div>
                
                <div className="Recipe">
                <header className="Recipe-header">
                
                <h1>Today's Recipe:</h1>
                </header>
                <div>
                <h2>{meal.strMeal}</h2>
                <div><strong>Culture: </strong>{meal.strArea}</div>
                <div><strong>Ingredients: </strong>{newArr.map(el => {return <li>{el}</li>})}</div>
                <div><strong>Instruction:</strong>{meal.strInstructions}</div>
                <img src={meal.strMealThumb} alt='recipePic'/>
                <h3>Reviews:</h3>
                <form action="/recipe" method="POST">
                <span>Review: </span>
                <input type='text' name='strReview'/>
                <span>Username: </span>
                <input type='text' name='strUsername'/>
                <span>Rating: </span>
                <input type='text' name='Rating'/>
                <span>Recipe ID: {meal.idMeal}</span>
                <button type="submit" onClick={handleClick}>Submit</button>
                </form>
                </div>
                </div>
            );
    }

// const recipeSchema = new Schema({
//   strCategory: String,
//   strArea: String,
//   strInstructions: String,
//   strTags: String,
// });

// const reviewSchema = new Schema({
//     strReview: { type: String, required: true },
//     strUsername: { type: String, required: true },
//     Rating: { type: Number, required: true },
//     RecipeId: { type: Number, required: true },
//   });

export default Recipe;


