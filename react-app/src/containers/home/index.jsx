import React from 'react';
import { connect } from 'react-redux';
import UserMeals from '../../components/user-meals';

const Home = ({ user }) => (user ? <UserMeals {...user} /> : null);

export default connect(({ auth }) => ({ user: auth.user }))(Home);
