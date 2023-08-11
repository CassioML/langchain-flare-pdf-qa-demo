import axios from "axios";

export const get_loaded_files = (userId: string, callback: any, error_callback: any) => {
  axios.post(
    'http://127.0.0.1:8000/list_files',
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

export const submit_url_to_load = (userId: string, fileURL: string, callback: any, error_callback: any) => {
  axios.post(
    'http://127.0.0.1:8000/load_pdf_url',
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

export const submit_question = (userId: string, question_id: string, question: string, callback: any, error_callback: any) => {
  axios.post(
    'http://127.0.0.1:8000/flare_ask',
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
