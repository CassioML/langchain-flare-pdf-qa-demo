import './App.css';
import { /*useEffect,*/ useState } from "react"

import {UserDesc} from "../interfaces/interfaces";

const AddFileForm = (props: UserDesc) => {

  const {userId} = props;

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`AddFileForm submitted`);
  };

  return (
    <form onSubmit={onSubmitHandler} className="form">
      <div>
        <label htmlFor="fileUrl">File URL</label>
        <input name="fileUrl" id="fileUrl" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddFileForm
