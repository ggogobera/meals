import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { TimePicker, DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { addNewMeal } from '../store/meals/actions';
import { setSnackbar } from '../store/ui/actions';

const Wrapper = styled.div`
  position: relative;
  vertical-align: middle;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: ${({ addWrapper }) => (addWrapper ? 'center' : 'initial')};
  max-width: 273px;
  width: 100%;
  height: 273px;
  margin: 15px;
  padding: 5px 16px 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: ${({ addWrapper }) => (addWrapper ? 'rgba(0, 0, 0, 0.2)' : 'unset')};
  border-radius: 10px;
  font-size: 1rem;

  .field-wrapper {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  .btns-container {
    margin: 15px 0 0;
    align-self: center;
  }

  .MuiFormHelperText-root.Mui-error {
    position: absolute;
    bottom: -20px;
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

class AddMeal extends React.PureComponent {
  state = {
    editMode: false,
    caption: 'My meal',
    date: new Date(),
    calories: 500
  };

  initialState = this.state;

  handleCaptionChange = event => this.setState({ caption: event.target.value });

  handleDateChange = date => this.setState({ date });

  handleCaloriesChange = event => {
    const { value } = event.target;
    this.setState({ calories: value && value < 1 ? 1 : value });
  };

  handleCancel = () => this.setState(this.initialState);

  setEditMode = () => this.setState({ editMode: true });

  handleSave = () => {
    const { userId } = this.props;
    const { caption, date, calories } = this.state;

    if (!userId || !caption || !date || !calories) {
      this.props.setSnackbar('Caption, date and calories are required');
    } else {
      this.props.addNewMeal({
        userId,
        caption,
        calories,
        date: date.toISOString(),
        onSuccess: res => {
          this.setState(this.initialState);
          this.props.onNewMeal(res);
        },
        onFailure: errors => this.props.setSnackbar(errors.message || 'Someting went wrong')
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { editMode, caption, date, calories } = this.state;

    return editMode ? (
      <Wrapper>
        <div className="field-wrapper">
          <FieldTitle>Caption</FieldTitle>
          <TextField
            value={caption}
            onChange={this.handleCaptionChange}
            inputProps={{ 'aria-label': 'Caption' }}
          />
        </div>
        <div className="field-wrapper">
          <FieldTitle>Date</FieldTitle>
          <DatePicker
            variant="dialog"
            format="MM/DD/YYYY"
            placeholder="12/31/2000"
            value={date}
            onChange={this.handleDateChange}
          />
        </div>
        <div className="field-wrapper">
          <FieldTitle>Time</FieldTitle>
          <TimePicker
            variant="dialog"
            placeholder="23:59"
            ampm={false}
            value={date}
            onChange={this.handleDateChange}
          />
        </div>
        <div className="field-wrapper">
          <FieldTitle>Calories</FieldTitle>
          <TextField
            type="number"
            value={calories}
            onChange={this.handleCaloriesChange}
            inputProps={{ 'aria-label': 'Calories' }}
          />
        </div>
        <div className="btns-container">
          <ButtonGroup variant="contained" aria-label="Save or cancel">
            <Button onClick={this.handleSave} color="primary" className={classes.saveBtn}>
              Save
              <SaveIcon className={classes.rightIcon} />
            </Button>
            <Button onClick={this.handleCancel} color="default">
              Cancel
              <DeleteIcon className={classes.rightIcon} />
            </Button>
          </ButtonGroup>
        </div>
      </Wrapper>
    ) : (
      <Wrapper addWrapper>
        <Fab
          color="primary"
          aria-label="Add meal"
          className={classes.addBtn}
          onClick={this.setEditMode}
        >
          <AddIcon className={classes.addIcon} />
        </Fab>
      </Wrapper>
    );
  }
}

const styles = {
  saveBtn: {
    width: '125px'
  },
  rightIcon: {
    marginLeft: '7px'
  },
  addIcon: {
    fontSize: '40px'
  },
  addBtn: {
    width: '80px',
    height: '80px'
  }
};

const enhance = compose(
  connect(
    null,
    {
      addNewMeal,
      setSnackbar
    }
  ),
  withStyles(styles)
);

export default enhance(AddMeal);
