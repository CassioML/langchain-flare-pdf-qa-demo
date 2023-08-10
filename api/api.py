# from typing import List

from fastapi import FastAPI, Depends
from pydantic import BaseModel

from utils.localCORS import permitReactLocalhostClient
from db import get_astra
from ai import get_embeddings, get_vectorstore, load_pdf_from_url

db, keyspace = get_astra()
embeddings = get_embeddings()
vectorstore = get_vectorstore(embeddings, db, keyspace)

class ListFileRequest(BaseModel):
    user_id: str

class LoadPDFRequest(BaseModel):
    user_id: str
    file_url: str

# app

app = FastAPI()
permitReactLocalhostClient(app)

@app.get('/')
def index():
    return {
        'db': str(db),
        'keyspace': str(keyspace),
        'embeddings': str(embeddings),
        'vectorstore': str(vectorstore),
    }

@app.post('/list_files')
def list_files(payload: ListFileRequest):
    import time
    time.sleep(0.3)
    return [
        "fake",
        "results",
        "for",
        payload.user_id,
        "temporarily.",
    ]

@app.post('/load_pdf_url')
def load_pdf_url(payload: LoadPDFRequest):
    try:
        load_pdf_from_url(payload.file_url, vectorstore)
        return "success"
    except Exception:
        return "error"
