import './App.css';
import { /*useEffect,*/ useState } from "react"
import {UserDesc, QuestionAndAnswer} from "../interfaces/interfaces";

import AskQuestionForm from "./AskQuestionForm";

const Query = (props: UserDesc) => {

  const {userId} = props;

  const [history, setHistory] = useState<QuestionAndAnswer[]>([]);

  const completeQuestion = (q_id: string, answer: string | undefined) => {
    console.log(`completing ${q_id} with ${answer || "ERRORED"}`);
    setHistory( (h) => h.map( q => {
      if (q.question_id === q_id){
        return {...q, ...{answer: (answer || "ERRORED")}};
      }else{
        return q;
      }
    }));
  }
  const addQuestion = (q_id: string, question: string) => {
    console.log(`adding ${q_id}: ${question}`);
    setHistory( (h) => h.concat( [{
      question_id: q_id,
      question: question,
      answer: undefined,
    }] ));
  }

  return (
    <div>
      <AskQuestionForm userId={userId} completeQuestion={completeQuestion} addQuestion={addQuestion} />
      <p>Your past questions:</p>
      <ul>
        { history.slice().reverse().map( q => <li key={q.question_id}>
          {q.question} : <i>{q.answer || "(unanswered...)"}</i>
        </li>) }
      </ul>
    </div>
  );
}

export default Query
