import './App.css';
import {v4 as uuidv4} from 'uuid';
import { useForm } from "react-hook-form";

import {UserDesc, QuestionSubmission} from "../interfaces/interfaces";
import {submit_question} from "../utils/api";

const AskQuestionForm = (props: UserDesc & {completeQuestion: (q_id: string, answer: string|undefined) => void , addQuestion: (q_id: string, question: string) => void;}) => {

  const {userId, addQuestion, completeQuestion} = props;

  const {register, handleSubmit, reset} = useForm<QuestionSubmission>();

  const onSubmitHandler = (values: QuestionSubmission) => {
    if (values.question) {
      const q_id = uuidv4();
      console.log(`AskQuestionForm submitted[${q_id}], with ${values.question}.`);
      reset();
      addQuestion(q_id, values.question);
      submit_question(
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
            completeQuestion(q_id, undefined);
          }
        },
        (e: any) => {
          console.log(e);
          completeQuestion(q_id, undefined);
        }
      );
    } else {
      console.log(`AskQuestionForm submitted but EMPTY INPUT`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="form">
        <div>
          <label htmlFor="question">Ask a question:</label>
          <input {...register("question")} className="inlineInput" name="question" id="question" type="text" />
          <button type="submit" className="inlineButton">Ask</button>
        </div>
      </form>
    </div>
  );

}

export default AskQuestionForm
