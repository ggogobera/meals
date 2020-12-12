import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthProvider } from './providers/AuthProvider';
import { RoleProvider } from './providers/RoleProvider';
import App from './App';
import configureStore from './store';
import GlobalStyle from './GlobalStyle';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
      <>
        <CssBaseline />
        <GlobalStyle />
        <AuthProvider>
          <RoleProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </RoleProvider>
        </AuthProvider>
      </>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
