# from typing import List

from fastapi import FastAPI, Depends
from pydantic import BaseModel

from utils.localCORS import permitReactLocalhostClient
from db import get_astra
from ai import get_embeddings, get_vectorstore, load_pdf_from_url, get_chat_model, get_flare_chain
from users import get_user_store, files_for_user, add_file_to_user, delete_file_from_user

db, keyspace = get_astra()
embeddings = get_embeddings()
chatmodel = get_chat_model()
user_store = get_user_store(db, keyspace)

class ListFileRequest(BaseModel):
    user_id: str

class LoadPDFRequest(BaseModel):
    user_id: str
    file_url: str

class QuestionRequest(BaseModel):
    user_id: str
    question_id: str
    question: str

class RemovePDFRequest(BaseModel):
    user_id: str
    file_name: str

# app

app = FastAPI()
permitReactLocalhostClient(app)
_ = get_vectorstore(embeddings, db, keyspace)


@app.get('/')
def index():
    return {
        'db': str(db),
        'keyspace': str(keyspace),
        'embeddings': str(embeddings),
    }


@app.post('/list_files')
def list_files(payload: ListFileRequest):
    return files_for_user(user_store, payload.user_id)


@app.post('/load_pdf_url')
def load_pdf_url(payload: LoadPDFRequest):
    try:
        vectorstore_u = get_vectorstore(embeddings, db, keyspace, user_id=payload.user_id)
        n_rows, file_name = load_pdf_from_url(payload.file_url, vectorstore_u)
        if n_rows is not None:
            add_file_to_user(user_store, payload.user_id, file_name, payload.file_url)
            return {
                "success": True,
                "n_rows": n_rows,
            }
        else:
            return {
                "success": False,
            }
    except Exception:
        return {
            "success": False,
        }


@app.post('/remove_pdf')
def remove_pdf(payload: RemovePDFRequest):
    try:
        vectorstore_u = get_vectorstore(embeddings, db, keyspace, user_id=payload.user_id)
        num_deleted = vectorstore_u.vector_table.find_and_delete_entries(metadata={"source": payload.file_name})
        delete_file_from_user(user_store, payload.user_id, payload.file_name)
        return {
            "success": True,
            "num_deleted": num_deleted,
        }
    except Exception:
        return {
            "success": False,
            "num_deleted": None,
        }


@app.post('/flare_ask')
def flare_ask(payload: QuestionRequest):
    import time
    try:
        vectorstore_u = get_vectorstore(embeddings, db, keyspace, user_id=payload.user_id)
        flarechain_u = get_flare_chain(chatmodel, vectorstore_u)
        result = flarechain_u.run(payload.question)
        #
        return {
            "question_id": payload.question_id,
            "success": True,
            "answer": result,
        }
    except Exception as e:
        return {
            "question_id": payload.question_id,
            "success": False,
            "error": str(e),
        }
