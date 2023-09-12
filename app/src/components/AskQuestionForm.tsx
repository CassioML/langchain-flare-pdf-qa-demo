import './App.css';
import { useState } from "react"
import {v4 as uuidv4} from 'uuid';
import { useForm } from "react-hook-form";

import {UserDesc, QuestionSubmission} from "../interfaces/interfaces";
import {QAMode} from "../interfaces/enums";
import {submit_question} from "../utils/api";

const AskQuestionForm = (props: UserDesc & {completeQuestion: (q_id: string, answer: string|undefined) => void , addQuestion: (q_id: string, qaMode: QAMode, question: string) => void;}) => {

  const {userId, addQuestion, completeQuestion} = props;

  const {register, handleSubmit, reset} = useForm<QuestionSubmission>();

  const [qaMode, setQaMode] = useState<QAMode>("FLARE");

  const onSubmitHandler = (values: QuestionSubmission) => {
    if (values.question) {
      const q_id = uuidv4();
      console.log(`AskQuestionForm submitted[${q_id}], with ${values.question}.`);
      reset();
      addQuestion(q_id, qaMode, values.question);
      submit_question(
        qaMode,
        userId || "",
        q_id,
        values.question,
        (response: any) => {
          console.log(`Gotten: ${JSON.stringify(response)}`);
          if (response.success){
            console.log(`Answer to ${q_id}: ${response.answer}`);
            completeQuestion(q_id, response.answer);
          }else{
            console.log(`Failed answer to ${q_id}`);
            completeQuestion(q_id, "(Failure!)");
          }
        },
        (e: any) => {
          console.log(e);
          completeQuestion(q_id, "(Failure!)");
        }
      );
    } else {
      console.log(`AskQuestionForm submitted but EMPTY INPUT`);
    }
  };

  return (
    <div>
      <div>
        QA mode:
          <span className={`qaMode ${qaMode==="FLARE" ? "selected" : "unselected"}`} onClick={() => setQaMode("FLARE")}>
            flare
          </span>
          <span className={`qaMode ${qaMode==="RAG" ? "selected" : "unselected"}`} onClick={() => setQaMode("RAG")}>
            rag
          </span>
          <span className={`qaMode ${qaMode==="SIMPLE" ? "selected" : "unselected"}`} onClick={() => setQaMode("SIMPLE")}>
            simple
          </span>
      </div> 
      <form onSubmit={handleSubmit(onSubmitHandler)} className="form">
        <div>
          <label htmlFor="question">Ask a question:</label>
          <input {...register("question")} className="inlineInputLong" name="question" id="question" type="text" />
          <button type="submit" className="inlineButton">Ask</button>
        </div>
      </form>
    </div>
  );

}

export default AskQuestionForm
