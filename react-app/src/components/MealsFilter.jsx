import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Sort from '@material-ui/icons/Sort';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DatePicker, TimePicker } from '@material-ui/pickers';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 15px;
  padding: 8px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);

  > div,
  .date-picker {
    margin: 0 80px 0 0;
  }

  .sort-icon {
    margin: 0 5px 0 0;

    &.asc {
      transform: rotateX(180deg);
    }
  }

  .date-pickers-wrapper {
    display: flex;
  }

  .date-picker {
    display: flex;
    justify-content: space-between;
    max-width: 200px;

    &.time {
      margin: 0 10px 0 0;
    }

    > div {
      width: 40%;

      > label {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  .filter-btns-wrapper {
    margin: 0 0 0 auto;
  }

  @media (max-width: 1090px) {
    flex-wrap: wrap;

    .filter-btns-wrapper {
      width: 100%;
      margin: 15px 0 0;
    }
  }

  @media (max-width: 830px) {
    .date-pickers-wrapper {
      justify-content: space-between;
      width: 100%;
      margin: 15px 0 0;

      > .date-picker {
        margin: 0;
      }
    }
  }

  @media (max-width: 500px) {
    margin: 15px 5px;
    padding: 8px 10px;

    .date-pickers-wrapper {
      flex-wrap: wrap;

      .date-picker {
        max-width: 100%;
        width: 100%;

        &.time {
          margin: 15px 0 0;
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  dateInputProps: {
    fontSize: '13px'
  }
});

const MealsFilter = ({
  dateAsc,
  onSortChange,
  onApply,
  onReset,
  date,
  onDateFromChange,
  onDateToChange,
  time,
  onTimeFromChange,
  onTimeToChange
}) => {
  const classes = useStyles();

  return (
    <Wrapper>
      <div className="sort-wrapper">
        <Button onClick={onSortChange}>
          <Sort className={classNames('sort-icon', { asc: dateAsc })} />
          <span>Sort by Date</span>
        </Button>
      </div>

      <div className="date-pickers-wrapper">
        {/* Date */}
        <div className="date-picker">
          <div>
            <label htmlFor="date-from">DATE (from)</label>
            <DatePicker
              clearable
              id="date-from"
              variant="dialog"
              format="MM/DD/YYYY"
              placeholder="12/31/2000"
              value={date.from}
              onChange={onDateFromChange}
              InputProps={{ className: classes.dateInputProps }}
            />
          </div>
          <div>
            <label htmlFor="date-to">DATE (to)</label>
            <DatePicker
              clearable
              id="date-to"
              variant="dialog"
              format="MM/DD/YYYY"
              placeholder="12/31/2000"
              value={date.to}
              minDate={date.from ? moment(date.from).add(1, 'd') : null}
              onChange={onDateToChange}
              InputProps={{ className: classes.dateInputProps }}
            />
          </div>
        </div>

        {/* Time */}
        <div className="date-picker time">
          <div>
            <label htmlFor="time-from">TIME (from)</label>
            <TimePicker
              clearable
              id="time-from"
              variant="dialog"
              placeholder="23:59"
              ampm={false}
              value={time.from}
              onChange={onTimeFromChange}
              InputProps={{ className: classes.dateInputProps }}
            />
          </div>
          <div>
            <label htmlFor="time-to">TIME (to)</label>
            <TimePicker
              clearable
              id="time-to"
              variant="dialog"
              placeholder="23:59"
              ampm={false}
              value={time.to}
              onChange={onTimeToChange}
              InputProps={{ className: classes.dateInputProps }}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="filter-btns-wrapper">
        <ButtonGroup className="filter-btns" variant="contained" aria-label="Filter buttons">
          <Button color="primary" onClick={onApply}>
            APPLY FILTER
          </Button>
          <Button onClick={onReset}>RESET</Button>
        </ButtonGroup>
      </div>
    </Wrapper>
  );
};

export default MealsFilter;
