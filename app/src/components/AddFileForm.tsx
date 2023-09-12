import './App.css';
import { useState } from "react"
import { useForm } from "react-hook-form";

import {UserDesc, FileURLSubmission} from "../interfaces/interfaces";
import {RequestStatus} from "../interfaces/enums";
import {submit_url_to_load} from "../utils/api";

const AddFileForm = (props: UserDesc & {refreshFiles: () => void}) => {

  const {userId, refreshFiles} = props;

  const {register, handleSubmit} = useForm<FileURLSubmission>();

  const [submitState, setSubmitState] = useState<RequestStatus>("initialized");

  const [showExampleUrls, setShowExampleUrls] = useState(false);

  const onSubmitHandler = (values: FileURLSubmission) => {
    if (values.fileURL) {
      setSubmitState("in_flight");
      console.log(`AddFileForm submitted, with ${values.fileURL}.`);
      submit_url_to_load(
        userId || "",
        values.fileURL,
        (response: any) => {
          console.log(`Gotten: ${JSON.stringify(response)}`);
          if (response.success){
            setSubmitState("completed");
            console.log(`Written ${response.n_rows} rows to vector table.`);
            refreshFiles();
          }else{
            console.log("Something went wrong loading the file");
            setSubmitState("errored");
          }
        },
        (e: any) => {console.log(e); setSubmitState("errored");}
      );
    } else {
      console.log(`AddFileForm submitted but EMPTY INPUT`);
    }
  };

  const toggleExampleUrls = () => {
    setShowExampleUrls( (v) => !v );
  }

  if (submitState === "initialized" || submitState === "errored" || submitState === "completed"){
    return (
      <div>
        { (submitState === "errored") && 
          <div>
            Submission errored!
          </div>
        }
        <form onSubmit={handleSubmit(onSubmitHandler)} className="form">
          <div>
            <label htmlFor="fileURL">
              Load new from URL:
              <span onClick={ toggleExampleUrls }>&#128712;</span>
            </label>
            <input {...register("fileURL")} className="inlineInputLong" name="fileURL" id="fileURL" type="text" />
            <button type="submit" className="inlineButton">Submit</button>
          </div>
          { ( showExampleUrls &&
            <div className="urlExamples">
              Example submissions:
              <ul>
                <li className="urlExample">https://github.com/CassioML/langchain-flare-pdf-qa-demo/blob/main/sources/nausea.pdf?raw=true</li>
                <li className="urlExample">https://github.com/CassioML/langchain-flare-pdf-qa-demo/blob/main/sources/the_hobbit.pdf?raw=true</li>
                <li className="urlExample">https://arxiv.org/pdf/1311.3081.pdf</li>
              </ul>
            </div> )
          }
        </form>
      </div>
    );
  } else if (submitState === "in_flight"){
    return <p>file submitted...</p>
  } else {
    return <p>(trouble with submission form)</p>
  }
}

export default AddFileForm
