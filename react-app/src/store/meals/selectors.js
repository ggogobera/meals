import moment from 'moment';
import { memoizeWith, identity } from 'ramda';

export const dateBasedMeals = desc =>
  memoizeWith(identity, meals => {
    const dateSortedMeals = meals.sort((a, b) =>
      desc ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );
    const mealsObject = {};

    dateSortedMeals.forEach(meal => {
      const date = moment(meal.date).format('MMM/DD/YYYY');

      if (mealsObject.hasOwnProperty(date)) {
        Object.assign(mealsObject[date], {
          totalCalories: mealsObject[date].totalCalories + meal.calories,
          data: [...mealsObject[date].data, meal]
        });
      } else {
        mealsObject[date] = {
          totalCalories: meal.calories,
          data: [meal]
        };
      }
    });

    return mealsObject;
  });
