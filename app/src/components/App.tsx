// import React from 'react';
import './App.css';

import Identity from './Identity';

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
      </div>
    </div>
  );
}

export default App;
