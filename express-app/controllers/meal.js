const mongoose = require('mongoose');
const moment = require('moment');
const { pick } = require('ramda');

const Meal = require('../models/Meal');
const mealValidation = require('../utils/mealValidation');
const { ROLES } = require('../constants');

exports.create = async (req, res, next) => {
  if (req.user.role !== ROLES.Admin && req.user._id.toString() !== req.body.userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const meal = pick(['userId', 'caption', 'date', 'calories'])(req.body || {});

    const { isValid, message } = mealValidation(meal);

    if (!isValid) {
      res.status(400).json({ message });
    } else {
      const time = moment(meal.date)
        .utc()
        .format('HH:mm');

      const newMeal = new Meal({ ...meal, time });

      await newMeal.save();

      res.status(201).json({ message: 'Success', data: newMeal });
    }
  } catch (e) {
    next(e);
  }
};

exports.read = async (req, res, next) => {
  try {
    const reqQuery = pick(['userId', 'dateFrom', 'dateTo', 'timeFrom', 'timeTo'])(req.query);

    if (req.user.role !== ROLES.Admin && req.user._id.toString() !== reqQuery.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const query = { ...pick(['userId'])(reqQuery), date: null, time: null };

    if (reqQuery.dateFrom) query.date = { $gte: reqQuery.dateFrom };
    if (reqQuery.dateTo) query.date = { ...(query.date || {}), $lt: reqQuery.dateTo };

    if (reqQuery.timeFrom) query.time = { $gte: reqQuery.timeFrom };
    if (reqQuery.timeTo) query.time = { ...(query.time || {}), $lt: reqQuery.timeTo };

    if (query.date === null) delete query['date'];
    if (query.time === null) delete query['time'];

    const meals = await Meal.find(query);

    res.status(200).json({ message: 'Success', data: meals });
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const update = pick(['mealId', 'date', 'caption', 'calories'])(req.body);

    if (!update.mealId) {
      return res.status(400).json({ message: 'Please, provide mealId' });
    }

    const { isValid, message } = mealValidation(update);

    if (!isValid) {
      res.status(400).json({ message });
    } else {
      if (!mongoose.Types.ObjectId.isValid(update.mealId)) {
        return res.status(400).json({ message: 'ID type is not ObjectId type' });
      }

      const meal = await Meal.findById(update.mealId);

      if (!meal) {
        return res.status(400).json({ message: 'Meal not found by mealId' });
      }

      if (!meal.userId.equals(req.user._id) && req.user.role !== ROLES.Admin) {
        return res.status(403).json({ message: 'Update forbidden' });
      }

      await meal.updateOne(update);

      res.status(200).json({ message: 'Success' });
    }
  } catch (e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.body.mealId);

    if (!meal) {
      return res.status(400).json({ message: 'Meal not found' });
    }

    if (!meal.userId.equals(req.user._id) && req.user.role !== ROLES.Admin) {
      return res.status(403).json({ message: 'Delete forbidden' });
    }

    await meal.remove();

    res.status(200).json({ message: 'Success', data: meal });
  } catch (e) {
    next(e);
  }
};
