import './App.css';
import { /*useEffect,*/ useState } from "react"
import { useForm } from "react-hook-form";

import {UserDesc, FileURLSubmission} from "../interfaces/interfaces";
import {submit_url_to_load} from "../utils/api";

const AddFileForm = (props: UserDesc & {refreshFiles: () => void}) => {

  const {userId, refreshFiles} = props;

  const {register, handleSubmit} = useForm<FileURLSubmission>();

  const [submitState, setSubmitState] = useState(0); // 0=form idle, 1=submission in flight, 2=last has errored (and form idle)

  const onSubmitHandler = (values: FileURLSubmission) => {
    if (values.fileURL) {
      setSubmitState(1);
      console.log(`AddFileForm submitted, with ${values.fileURL}.`);
      submit_url_to_load(
        userId || "",
        values.fileURL,
        (response: any) => {
          console.log(`Gotten: ${JSON.stringify(response)}`);
          if (response.success){
            setSubmitState(0);
            console.log(`Written ${response.n_rows} rows to vector table.`);
            refreshFiles();
          }else{
            console.log("Something went wrong loading the file");
            setSubmitState(2);
          }
        },
        (e: any) => {console.log(e); setSubmitState(2);}
      );
    } else {
      console.log(`AddFileForm submitted but EMPTY INPUT`);
    }
  };

  if (submitState === 0 || submitState === 2){
    return (
      <div>
        { (submitState === 2) && 
          <div>
            Submission errored!
          </div>
        }
        <form onSubmit={handleSubmit(onSubmitHandler)} className="form">
          <div>
            <label htmlFor="fileURL">File URL</label>
            <input {...register("fileURL")} className="inlineInput" name="fileURL" id="fileURL" type="text" />
            <button type="submit" className="inlineButton">Submit</button>
          </div>
        </form>
      </div>
    );
  } else if (submitState === 1){
    return <p>file submitted...</p>
  } else {
    return <p>(trouble with submission form)</p>
  }
}

export default AddFileForm
