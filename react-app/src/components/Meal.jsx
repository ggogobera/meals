import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import { TimePicker, DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

import { ReactComponent as Spinner } from '../assets/images/spinner.svg';
import { updateMeal, deleteMeal } from '../store/meals/actions';
import { setSnackbar } from '../store/ui/actions';

const Wrapper = styled.div`
  position: relative;
  vertical-align: middle;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 273px;
  width: 100%;
  height: 273px;
  margin: 15px;
  padding: 5px 16px 16px;
  border-radius: 10px;
  border: 1px solid ${({ warning }) => (warning ? 'rgba(201, 4, 4, 1)' : 'rgba(62, 133, 34, 1)')};
  overflow: hidden;
  font-size: 1rem;

  &.isBusy {
    border: 1px solid rgba(0, 0, 0, 0.2);

    &::before {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: -50px;
    bottom: -70px;
    transform: rotate(14deg);
    width: 150%;
    height: 100px;
    background: ${({ warning }) => (warning ? 'rgba(201, 4, 4, 1)' : 'rgba(62, 133, 34, 1)')};
    pointer-events: none;
  }

  .field-wrapper {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .field-value {
      height: 32px;
      line-height: 32px;
    }
  }

  .btns-container {
    margin: 15px 0 0;
    align-self: center;
  }

  .MuiFormHelperText-root.Mui-error {
    position: absolute;
    bottom: -20px;
  }

  .caption {
    padding: 0 18px 0 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .spinner {
    align-self: center;
    width: 40px;
    height: 40px;
  }

  @media (max-width: 500px) {
    margin: 15px 5px;
    padding: 10px;
  }
`;

const FieldTitle = styled.p`
  min-width: 90px;
  margin: 0;
  font-size: 1em;
  font-weight: 500;
  font-style: italic;
`;

const Caption = styled.h3`
  font-size: 0.875em;
  font-weight: normal;
  margin: 0;
`;

class Meal extends React.Component {
  state = {
    isBusy: false,
    editMode: false,
    caption: this.props.caption,
    date: this.props.date,
    calories: this.props.calories
  };

  handleCaptionChange = event => this.setState({ caption: event.target.value });

  handleDateChange = date => this.setState({ date });

  handleCaloriesChange = event => {
    const { value } = event.target;
    this.setState({ calories: value < 1 ? 1 : value });
  };

  handleEditCancel = () =>
    this.setState({
      editMode: false,
      caption: this.props.caption,
      date: this.props.date,
      calories: this.props.calories
    });

  handleEditSave = () => {
    const { date, caption, calories } = this.state;

    this.setState({ isBusy: true }, () => {
      this.props.updateMeal({
        mealId: this.props._id,
        date,
        caption,
        calories,
        onSuccess: () => this.setState({ isBusy: false, editMode: false }, this.props.onUpdate),
        onFailure: errors => {
          this.setState({ isBusy: false }, () => {
            this.props.setSnackbar(errors.message || 'Something went wrong');
          });
        }
      });
    });
  };

  handleDelete = () => {
    this.setState({ isBusy: true }, () => {
      this.props.deleteMeal({
        mealId: this.props._id,
        userId: this.props.userId,
        onSuccess: this.props.onDelete,
        onFailure: errors => {
          this.setState({ isBusy: false }, () => {
            this.props.setSnackbar(errors.message || 'Something went wrong');
          });
        }
      });
    });
  };

  render() {
    const { warning, classes } = this.props;
    const { isBusy, editMode, caption, date, calories } = this.state;

    if (isBusy) {
      return (
        <Wrapper className="isBusy">
          <Spinner className="spinner" />
        </Wrapper>
      );
    }

    return (
      <Wrapper warning={warning}>
        {!editMode && (
          <button aria-label="Delete" className={classes.deleteBtn} onClick={this.handleDelete}>
            <DeleteIcon fontSize="small" />
          </button>
        )}
        <div className="field-wrapper">
          <FieldTitle>Caption</FieldTitle>
          {editMode ? (
            <TextField
              value={caption}
              onChange={this.handleCaptionChange}
              inputProps={{ 'aria-label': 'Caption' }}
            />
          ) : (
            <Caption className="caption field-value">{caption}</Caption>
          )}
        </div>
        <div className="field-wrapper">
          <FieldTitle>Date</FieldTitle>
          {editMode ? (
            <DatePicker
              variant="dialog"
              format="MM/DD/YYYY"
              placeholder="12/31/2000"
              value={date}
              onChange={this.handleDateChange}
            />
          ) : (
            <div className="date field-value">{moment(date).format('MM/DD/YYYY')}</div>
          )}
        </div>
        <div className="field-wrapper">
          <FieldTitle>Time</FieldTitle>
          {editMode ? (
            <TimePicker
              variant="dialog"
              placeholder="23:59"
              ampm={false}
              value={date}
              onChange={this.handleDateChange}
            />
          ) : (
            <div className="time field-value">{moment(date).format('HH:mm')}</div>
          )}
        </div>
        <div className="field-wrapper">
          <FieldTitle>Calories</FieldTitle>
          {editMode ? (
            <TextField
              type="number"
              value={calories}
              onChange={this.handleCaloriesChange}
              inputProps={{ 'aria-label': 'Calories' }}
            />
          ) : (
            <div className="calories field-value">{calories}</div>
          )}
        </div>
        <div className="btns-container">
          {editMode ? (
            <ButtonGroup variant="contained" aria-label="Save or cancel">
              <Button onClick={this.handleEditSave} color="primary" className={classes.saveBtn}>
                Save
                <SaveIcon className={classes.rightIcon} />
              </Button>
              <Button onClick={this.handleEditCancel} color="default">
                Cancel
                <DeleteIcon className={classes.rightIcon} />
              </Button>
            </ButtonGroup>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.setState({ editMode: true })}
            >
              Edit
              <EditIcon className={classes.rightIcon} />
            </Button>
          )}
        </div>
      </Wrapper>
    );
  }
}

const styles = {
  saveBtn: {
    width: '125px'
  },
  rightIcon: {
    marginLeft: '5px'
  },
  deleteBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
    width: '25px',
    height: '25px',
    padding: '0',
    outline: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  }
};

const enhance = compose(
  withStyles(styles),
  connect(
    null,
    { updateMeal, deleteMeal, setSnackbar }
  )
);

export default enhance(Meal);
