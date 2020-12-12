const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');
const mealController = require('./controllers/meal');
const authenticate = require('./middlewares/authenticate');
const unauthorizedHandler = require('./middlewares/unauthorizedHandler');
const forbidFor = require('./middlewares/forbidFor');
const { ROLES } = require('./constants');

/**
 * USER
 */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authenticate, unauthorizedHandler, userController.logout);
router.get('/users', userController.read);
router.get('/user/current', authenticate, unauthorizedHandler, userController.readByToken);
router.post('/user', authenticate, unauthorizedHandler, forbidFor([ROLES.Regular]), userController.create);
router.patch('/user', authenticate, unauthorizedHandler, userController.update);
router.delete('/user', authenticate, unauthorizedHandler, userController.delete);

/**
 * MEAL
 */
router.post('/meal', authenticate, unauthorizedHandler, mealController.create);
router.get('/meals', authenticate, unauthorizedHandler, mealController.read);
router.patch('/meal', authenticate, unauthorizedHandler, mealController.update);
router.delete('/meal', authenticate, unauthorizedHandler, mealController.delete);

module.exports = router;
