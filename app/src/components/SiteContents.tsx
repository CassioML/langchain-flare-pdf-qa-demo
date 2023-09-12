import { useState } from "react"

import './App.css';
import {UserDesc} from "../interfaces/interfaces";
import {SitePage} from "../interfaces/enums";

import Home from "./Home";
import Docs from "./Docs";
import Query from "./Query";

const SiteContents = ({userId}: UserDesc) => {

  const [page, setPage] = useState<SitePage>("home");

  return (
    <div className="App-contents">
      { userId && <>
        <div className="App-navbar">
          <span onClick={() => setPage("home")}>Home</span>
          |
          <span onClick={() => setPage("docs")}>My docs</span>
          |
          <span onClick={() => setPage("ask")}>Ask questions</span>
        </div>
        <div className="App-body">
          { (page === "home" && <>
            <Home userId={userId} />
          </> )}
          { (page === "docs" && <>
            <Docs userId={userId} />
          </> )}
          { (page === "ask" && <>
            <Query userId={userId} />
          </> )}
        </div>
      </> }
    </div>
  );
}

export default SiteContents
