# 1. One-off: load docs into a vector store
import os

from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import Cassandra
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

from db import get_astra

SOURCE_DIR = "sources"
FILE_SUFFIX = ".pdf"

if __name__ == "__main__":
    embeddings = OpenAIEmbeddings()
    #
    pdf_loaders = [
        PyPDFLoader(pdf_name)
        for pdf_name in (
            f for f in (
                os.path.join(SOURCE_DIR, f2)
                for f2 in os.listdir(SOURCE_DIR)
            )
            if os.path.isfile(f)
            if f[-len(FILE_SUFFIX):] == FILE_SUFFIX
        )
    ]

    # set up the vector store
    session, keyspace = get_astra()
    vectorstore = Cassandra(
        embedding=embeddings,
        session=session,
        keyspace=keyspace,
        table_name="flare_pdf_demo",
    )

    # strip and load the docs
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=80,
    )
    documents = [
        doc
        for loader in pdf_loaders
        for doc in loader.load_and_split(text_splitter=text_splitter)
    ]
    #
    texts, metadatas = zip(*((doc.page_content, doc.metadata) for doc in documents))
    vectorstore.add_texts(texts=texts, metadatas=metadatas)
