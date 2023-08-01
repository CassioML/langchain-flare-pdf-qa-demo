# from typing import List

from fastapi import FastAPI, Depends

from db import get_astra
from ai import get_embeddings, get_vectorstore

db, keyspace = get_astra()
embeddings = get_embeddings()
vectorstore = get_vectorstore(embeddings, db, keyspace)

# app

app = FastAPI()

@app.get('/')
def index():
    return {
        'db': str(db),
        'keyspace': str(keyspace),
        'embeddings': str(embeddings),
        'vectorstore': str(vectorstore),
    }
