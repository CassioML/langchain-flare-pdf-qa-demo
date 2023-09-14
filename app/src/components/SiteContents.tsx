import './App.css';
import {UserDesc} from "../interfaces/interfaces";

import Home from "./Home";
import Docs from "./Docs";
import Query from "./Query";
import Slides from "./Slides";

const SiteContents = (props: UserDesc & {page: any, setPage: any}) => {

  const {userId, page, setPage} = props;

  return (
    <div className="App-contents">
      { userId && <>
        <div className="App-navbar">
          <span onClick={() => setPage("home")}>Home</span>
          |
          <span onClick={() => setPage("docs")}>My docs</span>
          |
          <span onClick={() => setPage("ask")}>Ask questions</span>
          |
          <span onClick={() => setPage("slides")}>Info</span>
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
          { (page === "slides" && <>
            <Slides />
          </> )}
        </div>
      </> }
      { userId === undefined && <>
        <img className="homeImage" src="squid.jpg" />
      </> }
    </div>
  );
}

export default SiteContents
