import './App.css';
import { useEffect, useState } from "react"

import {UserDesc} from "../interfaces/interfaces";
import {get_loaded_files} from "../utils/api_files";

import AddFileForm from "./AddFileForm";

const Docs = (props: UserDesc) => {

  const {userId} = props;

  const [queryState, setQueryState] = useState(0); // 0=nothing, 1=querying, 2=done, 3=error
  const [fileList, setFileList] = useState<string[]>([]);

  const refreshFiles = () => {
    setQueryState(1);
    get_loaded_files(
      userId || "",
      (r: string[]) => {
        setFileList(r);
        setQueryState(2);
      },
      (e: any) => {console.log(e); setQueryState(3);}
    );
  }

  useEffect(
    refreshFiles,
    [userId]
  );

  return (
    <div>
      DOCS FOR {userId}
      { (queryState === 0) &&
        <p>(nothing to see here)</p>
      }
      { (queryState === 1) &&
        <p>wait...</p>
      }
      { (queryState === 2) &&
        <div>RESULTS (<span onClick={refreshFiles}>Reload</span>):
          <ul>
            { fileList.map( (f: string, i: number) => <li key={i}>{f}</li>) }
          </ul>
          <AddFileForm userId={userId} refreshFiles={refreshFiles} />
        </div>
      }
      { (queryState === 3) &&
        <p>Error fetching docs</p>
      }
    </div>
  );
}

export default Docs
