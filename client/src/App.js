import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";


function App() {
  const checkAuthenticated = async() => {
    try {
      const response = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {token: localStorage.token}
      });

      const result = await response.json();

      result === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={!isAuthenticated ? (<Signup setAuth={setAuth}/>) : (<Navigate to="/login" />)} />
            <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth}/>) : (<Navigate to="/profile" />)} />
            <Route exact path="/profile" element={isAuthenticated ? (<Profile setAuth={setAuth}/>) : (<Navigate to="/login" />)} />
            <Route path="/*" element={<PageNotFound />}/>
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </Fragment>
  );
};

export default App;
