import './App.css';
import { useState } from "react"
import {UserDesc, QuestionAndAnswer} from "../interfaces/interfaces";

import AskQuestionForm from "./AskQuestionForm";

const Query = (props: UserDesc) => {

  const {userId} = props;

  const [history, setHistory] = useState<QuestionAndAnswer[]>([]);

  const completeQuestion = (q_id: string, answer: string | undefined) => {
    console.log(`completing ${q_id} with ${answer}`);
    setHistory( (h) => h.map( q => {
      if (q.question_id === q_id){
        return {...q, ...{answer: answer}};
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
      { ( (history.length > 0) && <>
          <p>Question history:</p>
          { history.slice().reverse().map( q =>
            <div className="questionBlock" key={q.question_id}>
              <p className="questionBody">{q.question}</p>
              <p className="answerBody">{q.answer === undefined ? "⌛" : q.answer || "(no answer)"}</p>
            </div>
          ) }
      </> ) }
    </div>
  );
}

export default Query
