// import React from 'react';
import './App.css';

import Identity from './Identity';
import SiteContents from './SiteContents';

import { useState } from "react"

function App() {

  const [userId, setUserId] = useState<string>();

  return (
    <div className="App">
      <div className="App-header">
        <Identity
          userId={userId}
          setUserId={setUserId}
        />
      </div>
      <hr />
      <div className="App-body">
        <SiteContents
          userId={userId}
        />
      </div>
    </div>
  );
}

export default App;
