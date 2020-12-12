import React from 'react';
import styled from 'styled-components';

import { dateBasedMeals } from '../../store/meals/selectors';
import Meal from '../Meal';

const Wrapper = styled.div`
  margin: 20px 0;
`;

const Date = styled.section`
  > h3 {
    font-size: 1.6rem;
    font-style: italic;
  }

  .meals-container {
    display: flex;
    flex-wrap: wrap;
  }
`;

const hasWarning = (dateTotal, target) => target !== null && dateTotal > target;

const MealsDateTable = ({ meals, dateAsc, dailyCaloriesTarget, onMealUpdate, onMealDelete }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mealsObject = React.useMemo(() => dateBasedMeals(!dateAsc)(meals), [
    meals,
    dateAsc,
    dailyCaloriesTarget
  ]);

  return (
    <Wrapper>
      {Object.keys(mealsObject).map(date => (
        <Date key={date}>
          <h3>{date}</h3>
          <div className="meals-container">
            {mealsObject[date].data.map(meal => (
              <Meal
                key={meal._id}
                onUpdate={onMealUpdate}
                onDelete={onMealDelete}
                warning={hasWarning(mealsObject[date].totalCalories, dailyCaloriesTarget)}
                {...meal}
              />
            ))}
          </div>
        </Date>
      ))}
    </Wrapper>
  );
};

export default MealsDateTable;
