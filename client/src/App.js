import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import Alert from "./components/alert/Alert.component";
import LandingPage from "./pages/landing-page/LandingPage.component";
import SignupPage from "./pages/signup-page/SignupPage.component";
import SigninPage from "./pages/signin-page/SigninPage.component";
import PrivateRoute from "./components/private-route/PrivateRoute.component";
import DashboardPage from "./pages/dashboard-page/DashboardPage.component";
import CreateProfilePage from "./pages/create-profile-page/CreateProfilePage.component";
import EditProfilePage from "./pages/edit-profile-page/EditProfilePage.component";
import ProfilesPage from "./pages/profiles-page/ProfilesPage.component";
import ProfilePage from "./pages/profile-page/ProfilePage.component";
import PostsPage from "./pages/posts-page/PostsPage.component";
import AddPostPage from "./pages/add-post-page/AddPostPage.component";
import PostPage from "./pages/post-page/PostPage.component";
import FeedPage from "./pages/feed-page/FeedPage.component";
//import ComingSoonPage from "./pages/coming-soon/ComingSoonPage.component";

import { loadUser } from "./redux/auth/auth.actions";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Alert />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/signin" component={SigninPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <PrivateRoute
            exact
            path="/profile/new"
            component={CreateProfilePage}
          />
          <PrivateRoute
            exact
            path="/profile/edit"
            component={EditProfilePage}
          />
          <PrivateRoute exact path="/profiles" component={ProfilesPage} />
          <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
          <PrivateRoute exact path="/posts" component={PostsPage} />
          <PrivateRoute exact path="/feed" component={FeedPage} />
          <PrivateRoute exact path="/posts/new" component={AddPostPage} />
          <PrivateRoute exact path="/posts/:id" component={PostPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
