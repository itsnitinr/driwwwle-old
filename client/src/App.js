import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import Alert from "./components/alert/Alert.component";
import LandingPage from "./pages/landing-page/LandingPage.component";
import SignupPage from "./pages/signup-page/SignupPage.component";
import SigninPage from "./pages/signin-page/SigninPage.component";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Alert />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/signin" component={SigninPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
