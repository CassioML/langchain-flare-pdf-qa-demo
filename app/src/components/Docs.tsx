import './App.css';
import { useEffect, useState } from "react"

import {UserDesc, FileItem} from "../interfaces/interfaces";
import {RequestStatus} from "../interfaces/enums";
import {get_loaded_files, remove_file} from "../utils/api";

import AddFileForm from "./AddFileForm";

const Docs = (props: UserDesc) => {

  const {userId} = props;

  const [queryState, setQueryState] = useState<RequestStatus>("initialized");
  const [fileList, setFileList] = useState<FileItem[]>([]);

  const refreshFiles = () => {
    setQueryState("in_flight");
    get_loaded_files(
      userId || "",
      (r: FileItem[]) => {
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
      { (queryState === "initialized") &&
        <p>(nothing to see here)</p>
      }
      { (queryState === "in_flight") &&
        <p>wait...</p>
      }
      { (queryState === "completed") &&
        <div>{userId}'s docs <button onClick={refreshFiles} className="inlineButton">&#x21bb; Reload</button>
          <ul className="fileList">
            { fileList.map( (f: FileItem) => <li key={f.name}>
              {f.name} (<a href={f.url} target="blank;" className="fileSourceUrl">source</a>)
            <button className="inlineButton" onClick={(e) => removeFile(f.name)}>&#128465; Remove</button>
            </li>) }
          </ul>
          <hr className="fancy" />
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
