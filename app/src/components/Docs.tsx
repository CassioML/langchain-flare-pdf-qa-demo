import './App.css';
import { useEffect, useState } from "react"

import {UserDesc} from "../interfaces/interfaces";
import {RequestStatus} from "../interfaces/enums";
import {get_loaded_files, remove_file} from "../utils/api";

import AddFileForm from "./AddFileForm";

const Docs = (props: UserDesc) => {

  const {userId} = props;

  const [queryState, setQueryState] = useState<RequestStatus>("initialized");
  const [fileList, setFileList] = useState<string[]>([]);

  const refreshFiles = () => {
    setQueryState("in_flight");
    get_loaded_files(
      userId || "",
      (r: string[]) => {
        setFileList(r);
        setQueryState("completed");
      },
      (e: any) => {console.log(e); setQueryState("errored");}
    );
  }

  const removeFile = (file_name: string) => {
    console.log(`Removing ${file_name}`);
    setQueryState("in_flight");
    remove_file(
      userId || "",
      file_name,
      (r: any) => {
        console.log(`Removed ${r.num_deleted} entries.`);
        refreshFiles();
      },
      (e: any) => {console.log(e); setQueryState("errored");}
    );
  }

  useEffect(
    refreshFiles,
    [userId]
  );

  return (
    <div>
      DOCS FOR {userId}
      { (queryState === "initialized") &&
        <p>(nothing to see here)</p>
      }
      { (queryState === "in_flight") &&
        <p>wait...</p>
      }
      { (queryState === "completed") &&
        <div>RESULTS (<span onClick={refreshFiles}>Reload</span>):
          <ul>
            { fileList.map( (f: string, i: number) => <li key={i}>
              {f}
            &nbsp;<span onClick={(e) => removeFile(f)}>[DEL]</span>
            </li>) }
          </ul>
          <AddFileForm userId={userId} refreshFiles={refreshFiles} />
        </div>
      }
      { (queryState === "errored") &&
        <p>Error fetching docs</p>
      }
    </div>
  );
}

export default Docs
