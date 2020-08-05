import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.component";
import LandingPage from "./pages/landing-page/LandingPage.component";
import Footer from "./components/footer/Footer.component";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
