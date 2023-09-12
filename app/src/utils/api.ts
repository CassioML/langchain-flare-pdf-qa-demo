import axios from "axios";

import {QAMode} from "../interfaces/enums";

const base_url: string = process.env["REACT_APP_API_BASE_URL"] || "http://127.0.0.1:8000";

export const get_loaded_files = (userId: string, callback: any, error_callback: any) => {
  axios.post(
    `${base_url}/list_files`,
    {user_id: userId}
  )
  .then((response: any) => {
    callback(response.data);
  })
  .catch((error: any) => {
    if(error_callback){
      error_callback(error);
    }
  });
}

export const remove_file = (userId: string, file_name: string, callback: any, error_callback: any) => {
  axios.post(
    `${base_url}/remove_pdf`,
    {user_id: userId, file_name: file_name}
  )
  .then((response: any) => {
    callback(response.data);
  })
  .catch((error: any) => {
    if(error_callback){
      error_callback(error);
    }
  });
}


export const submit_url_to_load = (userId: string, fileURL: string, callback: any, error_callback: any) => {
  axios.post(
    `${base_url}/load_pdf_url`,
    {
      user_id: userId,
      file_url: fileURL,
    }
  )
  .then((response: any) => {
    callback(response.data);
  })
  .catch((error: any) => {
    if(error_callback){
      error_callback(error);
    }
  });
}

export const submit_question = (qaMode: QAMode, userId: string, question_id: string, question: string, callback: any, error_callback: any) => {
  let endpoint: string
  if (qaMode === "FLARE") {
    endpoint = "flare_ask";
  } else if (qaMode === "RAG") {
    endpoint = "rag_ask";
  } else{ // qaMode === "SIMPLE"
    endpoint = "llm_ask";
  }
  //
  axios.post(
    `${base_url}/${endpoint}`,
    {
      user_id: userId,
      question_id: question_id,
      question: question,
    }
  )
  .then((response: any) => {
    callback(response.data);
  })
  .catch((error: any) => {
    if(error_callback){
      error_callback(error);
    }
  });
}
