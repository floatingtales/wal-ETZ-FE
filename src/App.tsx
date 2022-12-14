import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InitAccount from "./pages/InitAccount";
import HomePage from "./pages/HomePage";
import GlobalProvider from "./provider/GlobalProvider";
import ReducerLoader from "./pages/ReducerLoader";
import OauthLoader from "./pages/OauthLoader";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/oauthLoader" element={<OauthLoader />} />
            <Route path="/getStarted" element={<InitAccount />} />
            <Route path="/loading" element={<ReducerLoader />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
