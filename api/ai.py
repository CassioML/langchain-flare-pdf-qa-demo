import shutil
import tempfile
import os
from urllib import request

from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Cassandra
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import FlareChain
from langchain.chat_models import ChatOpenAI

VECTOR_PDF_TABLE_NAME = "flare_doc_bank"

embeddingService = None
vectorStore = None
chatModel = None
flareChain = None


def get_chat_model():
    global chatModel
    if chatModel is None:
        chatModel = ChatOpenAI(temperature=0)
    return chatModel


def get_flare_chain(chmodel, vstore):
    global flareChain
    if flareChain is None:
        retriever = vstore.as_retriever()
        flareChain = FlareChain.from_llm(
            chmodel,
            retriever=retriever,
            max_generation_len=164,
            min_prob=0.3,
        )
    return flareChain


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

# PDF loading machinery
def _finalize_metadata(md_dict):
    return {
        k: v if k != "source" else os.path.split(v)[1]
        for k, v in md_dict.items()
    }


def load_pdf_from_file(file_name, vector_store):
    try:
        print(f"Loading {file_name}")
        pdf_loader = PyPDFLoader(file_name)
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=80,
        )
        documents = [
            doc
            for doc in pdf_loader.load_and_split(text_splitter=text_splitter)
        ]
        texts, metadatas0 = zip(*((doc.page_content, doc.metadata) for doc in documents))
        #
        metadatas = [
            _finalize_metadata(md)
            for md in metadatas0
        ]
        #
        vector_store.add_texts(texts=texts, metadatas=metadatas)
        print(f"Finished loading.")
        return len(documents)
    except Exception:
        return None

def extract_file_title(file_url):
    try:
        pre, title = os.path.split(file_url)
        if "?" in title:
            return title.split("?")[0]
        else:
            return title
    except:
        return "unnamed.pdf"


def load_pdf_from_url(file_url, vector_store):
    tmp_dir = tempfile.mkdtemp()
    try:
        file_title = extract_file_title(file_url)
        pdf_file_path = os.path.join(tmp_dir, file_title)
        request.urlretrieve(file_url, pdf_file_path)
        return load_pdf_from_file(pdf_file_path, vector_store)
    finally:
        shutil.rmtree(tmp_dir)
        return None


# if __name__ == '__main__':
#     from db import get_astra
#     se, ks = get_astra()
#     em = get_embeddings()
#     vs = get_vectorstore(em, se, ks)
#     #
#     load_pdf_from_url("https://github.com/hemidactylus/langchain-flare-pdf-qa-demo/blob/SL-app/sources/nausea.pdf?raw=true", vector_store=vs)
#     load_pdf_from_url("https://github.com/hemidactylus/langchain-flare-pdf-qa-demo/blob/SL-app/sources/the_hobbit.pdf?raw=true", vector_store=vs)
