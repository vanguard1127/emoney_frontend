import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { store } from './config/store/configureStore';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollToTop from './utils/ScrollToTop';
import Routes from './Routes';
import './App.css';
import './assets/base.scss';
import { IntlProvider } from 'react-intl'

import en from "lang/en.json";
const messages = { en };

function App() {
  return (
    <Provider store={store}>
      <IntlProvider locale={"en"} messages={messages["en"]}>
        <BrowserRouter basename="/">
          <CssBaseline />
          <ScrollToTop>
            <Routes />
          </ScrollToTop>
        </BrowserRouter>
      </IntlProvider>
    </Provider>

  );
}

export default App;
