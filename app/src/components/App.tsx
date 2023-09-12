// import React from 'react';
import './App.css';

import Identity from './Identity';
import SiteContents from './SiteContents';
import {SitePage} from "../interfaces/enums";

import { useState } from "react"

function App() {

  const [userId, setUserId] = useState<string>();
  const [page, setPage] = useState<SitePage>("home");

  return (
    <div className="App">
      <div className="App-header">
        <Identity
          userId={userId}
          setUserId={setUserId}
          setPage={setPage}
        />
      </div>
      <hr className="fancy" />
      <div className="App-body">
        <SiteContents
          userId={userId}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default App;
