const fetch = require('node-fetch');
const Meal = require('../models/recipeModel');

const mealController = {};

mealController.createRecipe = async (req, res, next) => {
  const { strCategory, strArea, strInstructions, strTags } = req.body;
  try {
    const data = await Meal.UserRecipe.create({
      strCategory,
      strArea,
      strInstructions,
      strTags,
    });
    console.log(data);
    res.locals.userRecipes = data;
    next();
  } catch (err) {
    next({
      message: err,
    });
  }
};

mealController.postReview = async (req, res, next) => {
  const { strReview, strUsername, Rating, RecipeId } = req.body;

  try {
    const data = await Meal.UserReview.create({
      strReview,
      strUsername,
      Rating,
      RecipeId,
    });
    console.log(data);
    res.locals.userReview = data;
    next();
  } catch (err) {
    next({
      message: err,
    });
  }
};

mealController.updateReview = async (req, res, next) => {
  const { id } = req.params;
  const { strReview, Rating } = req.body;

  try {
    const data = await Meal.UserReview.findByIdAndUpdate(
      id,
      { strReview: strReview, Rating: Rating }
    );
    res.locals.updatedReview = data;
    next();
  } catch (err) {
    next({
      message: err,
    });
  }
};

mealController.deleteReview = async (req, res, next) => {
  const findId = req.params['id'];
  try{
    const deleted = await Meal.UserReview.findByIdAndDelete(findId, {})
    res.locals.deletedReview = deleted;
    return next();
  }
  catch (err) {
     return next({
      message: err,
    });
   }
  }


// mealController.randomArea = (req, res, next) => {
//   const area = [
//     'American',
//     'British',
//     'Canadian',
//     'Chinese',
//     'Croatian',
//     'Dutch',
//     'Egyptian',
//     'French',
//     'Greek',
//     'Indian',
//     'Irish',
//     'Italian',
//     'Jamaican',
//     'Japanese',
//     'Kenyan',
//     'Malaysian',
//     'Mexican',
//     'Moroccan',
//     'Polish',
//     'Portuguese',
//     'Russian',
//     'Spanish',
//     'Thai',
//     'Tunisian',
//     'Turkish',
//     'Unknown',
//     'Vietnamese',
//   ];
//   let num = Math.floor(Math.random() * (27 - 0) + 0);
//   console.log(num);
//   let result = area[num];
//   const url = `https://themealdb.com/api/json/v1/1/filter.php?a=${result}`;
//   console.log(url);
//   fetch(url)
//     .then((data) => data.json())
//     .then((data) => {
//       res.locals.recipe = data;
//       return next();
//     })
//     .catch((err) =>
//       next({
//         log: 'filterByarea',
//         message: {
//           err: err,
//           ERROR: 'Check log for details',
//         },
//       })
//     );
// };

// mealController.randomRecipe = (req, res, next) => {
//   const url = 'https://themealdb.com/api/json/v1/1/random.php';
//   fetch(url)
//     .then((data) => data.json())
//     .then((data) => {
//       res.locals.recipe = data;
//       return next();
//     })
//     .catch((err) =>
//       next({
//         log: 'randomRecipe',
//         message: {
//           err: err,
//           ERROR: 'Check log for details',
//         },
//       })
//     );
// };

module.exports = mealController;
