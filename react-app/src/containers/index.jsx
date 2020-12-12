import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

export const AsyncAuth = Loadable({
  loader: () => import(/* webpackChunkName: 'Auth' */ './auth'),
  loading: ({ pastDelay }) => (pastDelay ? <Loading fullPage /> : null),
  delay: 1000
});

export const AsyncProfile = Loadable({
  loader: () => import(/* webpackChunkName: 'Profile' */ './profile'),
  loading: ({ pastDelay }) => (pastDelay ? <Loading fullPage /> : null),
  delay: 1000
});

export const AsyncUsers = Loadable({
  loader: () => import(/* webpackChunkName: 'Users' */ './users'),
  loading: ({ pastDelay }) => (pastDelay ? <Loading fullPage /> : null),
  delay: 1000
});

export const AsyncUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './user'),
  loading: ({ pastDelay }) => (pastDelay ? <Loading fullPage /> : null),
  delay: 1000
});
