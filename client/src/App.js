import React, { Fragment, useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/signup" element={!isAuthenticated ? (<Signup setAuth={setAuth}/>) : (<Navigate to="/login" />)} />
            <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/profile" />)} />
            <Route exact path="/profile" element={isAuthenticated ? (<Profile setAuth={setAuth}/>) : (<Navigate to="/login" />)} />
            <Route path="/*" element={<PageNotFound />}/>
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
