import './App.css';
import { useEffect, useState } from "react"

import {UserDesc} from "../interfaces/interfaces";
import {get_loaded_files} from "../utils/api_files";

import AddFileForm from "./AddFileForm";

const Docs = (props: UserDesc) => {

  const {userId} = props;

  const [querying, setQuerying] = useState(false);
  const [fileList, setFileList] = useState<string[]>([]);

  const refreshFiles = () => {
    setQuerying(true);
    get_loaded_files(
      userId || "",
      (r: string[]) => {
        setFileList(r);
        setQuerying(false);
      },
      (e: any) => {console.log(e);}
    );
  }

  useEffect(
    refreshFiles,
    [userId]
  );

  return (
    <div>
      DOCS FOR {userId}
      { querying &&
        <p>wait...</p>
      }
      { querying ||
        <div>RESULTS:
          <ul>
            { fileList.map( (f: string) => <li>{f}</li>) }
          </ul>
          <AddFileForm userId={userId} />
        </div>
      }
    </div>
  );
}

export default Docs
