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
