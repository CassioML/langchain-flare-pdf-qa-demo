from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Cassandra

VECTOR_PDF_TABLE_NAME = "flare_pdf_demo"

embeddingService = None
vectorStore = None

def get_embeddings():
    global embeddingService
    if embeddingService is None:
        embeddingService = OpenAIEmbeddings()
    return embeddingService

def get_vectorstore(embeddings, db, ks):
    global vectorStore
    if vectorStore is None:
        vectorStore = Cassandra(
            embedding=embeddings,
            session=db,
            keyspace=ks,
            table_name=VECTOR_PDF_TABLE_NAME,
        )
    return vectorStore
