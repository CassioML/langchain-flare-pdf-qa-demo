// import React from 'react';
import './App.css';

import Identity from './Identity';
import SiteContents from './SiteContents';

import { /*useEffect,*/ useState } from "react"

function App() {

  const [userId, setUserId] = useState<string>();

  return (
    <div className="App">
      <header className="App-header">
        <p>PDF FLARE demo</p>
      </header>
      <div className="App-body">
        <Identity
          userId={userId}
          setUserId={setUserId}
        />
        <hr />
        <SiteContents
          userId={userId}
        />
      </div>
    </div>
  );
}

export default App;
