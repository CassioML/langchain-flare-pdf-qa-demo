// import { useEffect, useState } from "react"
// import { Dispatch, SetStateAction } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import './App.css';
import {UserDesc} from "../interfaces/interfaces";

import Home from "./Home";
import Docs from "./Docs";

const SiteContents = ({userId}: UserDesc) => {
  return (
    <div className="App-contents">
      <div className="App-navbar">
        { userId && 
          <Router>
            <div>
              <p>
                <Link to="/">Home</Link>
                |
                <Link to="/docs">My docs</Link>
                |
              </p>
            </div>

            <Routes>
              <Route index element={<Home userId={userId} />} />
              <Route
                path="/docs"
                element={<Docs userId={userId} />}
              />
            </Routes>

          </Router>
        }
      </div>
    </div>
  );
}

export default SiteContents
