import { useState } from "react"
import { Dispatch, SetStateAction } from "react";

import './App.css';


export interface UserProps {
  userId: string|undefined;
  setUserId: Dispatch<SetStateAction<string|undefined>>;
}


const Identity = (props: {userId: any, setUserId: any, setPage: any}) => {

  const {userId, setUserId, setPage} = props;

  const [editUserId, setEditUserId] = useState('');


  const trySetUserId = (newUserId: string) => {
    if(newUserId){
      setUserId(newUserId);
      setPage("home");
    }
  }

  return ( <>
    <div className="App-identity">
      { !userId && <div>
        <p>
          PDF FLARE demo - Who are you?
          <input
            className="inlineInput"
            type="text"
            name="userid"
            value={editUserId}
            onChange={(e) => setEditUserId(e.target.value)}
            onKeyPress={(e) => {if (e.key === 'Enter') { trySetUserId(editUserId) }}}
          />
          <button
            onClick={() => trySetUserId(editUserId)}
            className="inlineButton"
          >
            Login
          </button>
        </p>
      </div>}
      { userId && <div>
        <p>
          PDF FLARE demo - Welcome, <span className="userName">{userId}</span>

          <button
            onClick={() => {
              setUserId(undefined);
            }}
            className="inlineButton"
          >
            Logout
          </button>

        </p>

      </div>}
    </div>
  </> );
}

export default Identity
