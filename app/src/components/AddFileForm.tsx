import './App.css';
// import { /*useEffect,*/ useState } from "react"
import { useForm } from "react-hook-form";

import {UserDesc, FileURLSubmission} from "../interfaces/interfaces";

const AddFileForm = (props: UserDesc & {refreshFiles: () => void}) => {

  const {userId, refreshFiles} = props;

  const {register, handleSubmit} = useForm<FileURLSubmission>();

  const onSubmitHandler = (values: FileURLSubmission) => {
    if (values.fileURL) {
      console.log(`AddFileForm submitted, with ${values.fileURL}.`);
      // TODO async call to submit the PDF to the api...
      refreshFiles();
    } else {
      console.log(`AddFileForm submitted but EMPTY INPUT`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="form">
      <div>
        <label htmlFor="fileURL">File URL</label>
        <input {...register("fileURL")} className="inlineInput" name="fileURL" id="fileURL" type="text" />
        <button type="submit" className="inlineButton">Submit</button>
      </div>
    </form>
  );
}

export default AddFileForm