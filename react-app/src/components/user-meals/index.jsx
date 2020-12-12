import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { getMeals } from '../../store/meals/actions';
import { setSnackbar } from '../../store/ui/actions';
import AddMeal from '../AddMeal';
import MealsFilter from '../MealsFilter';
import { parseUTCTime, zeroUTCDateTime } from '../../utils/timeHelpers';
import MealsDateTable from './MealsDateTable';

class UserMeals extends React.PureComponent {
  state = {
    meals: [],
    dateAsc: false,
    date: { from: null, to: null },
    time: { from: null, to: null }
  };

  componentDidMount() {
    this.getUserMeals();
  }

  handleSortChange = debounce(() => {
    this.setState(prevState => ({ dateAsc: !prevState.dateAsc }), this.getUserMeals);
  }, 1000);

  handelDateChange = name => date => {
    this.setState(prevState => ({ date: { ...prevState.date, [name]: date } }));
  };

  handleTimeChange = name => time => {
    this.setState(prevState => ({ time: { ...prevState.time, [name]: time } }));
  };

  handleFilterReset = () => {
    this.setState(
      {
        dateAsc: false,
        date: { from: null, to: null },
        time: { from: null, to: null }
      },
      this.getUserMeals
    );
  };

  getUserMeals = () => {
    const { _id: userId } = this.props;
    const { date, time } = this.state;

    this.props.getMeals({
      userId,
      dateFrom: date.from && zeroUTCDateTime(date.from),
      dateTo: date.to && zeroUTCDateTime(date.to),
      timeFrom: time.from && parseUTCTime(time.from),
      timeTo: time.to && parseUTCTime(time.to),
      onSuccess: res => this.setState({ meals: res.data }),
      onFailure: errors => this.props.setSnackbar(errors.message || 'Something went wrong')
    });
  };

  render() {
    const { _id: userId, dailyCaloriesTarget } = this.props;
    const { dateAsc, meals, date, time } = this.state;

    return (
      <>
        <MealsFilter
          dateAsc={dateAsc}
          onSortChange={this.handleSortChange}
          onApply={this.getUserMeals}
          onReset={this.handleFilterReset}
          date={date}
          onDateFromChange={this.handelDateChange('from')}
          onDateToChange={this.handelDateChange('to')}
          time={time}
          onTimeFromChange={this.handleTimeChange('from')}
          onTimeToChange={this.handleTimeChange('to')}
        />
        <AddMeal userId={userId} onNewMeal={this.getUserMeals} />
        <MealsDateTable
          meals={meals}
          dateAsc={dateAsc}
          dailyCaloriesTarget={dailyCaloriesTarget}
          onMealUpdate={this.getUserMeals}
          onMealDelete={this.getUserMeals}
        />
      </>
    );
  }
}

export default connect(
  null,
  { getMeals, setSnackbar }
)(UserMeals);
