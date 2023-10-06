import shutil
import tempfile
import os
from dotenv import load_dotenv
from urllib import request

from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Cassandra
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import FlareChain
from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
from langchain.indexes.vectorstore import VectorStoreIndexWrapper


VECTOR_PDF_TABLE_NAME = "flare_doc_bank"

load_dotenv("../.env")

embeddingService = None
chatModel = None
llm = None


def get_chat_model():
    global chatModel
    if chatModel is None:
        chatModel = ChatOpenAI(temperature=0)
    return chatModel


def get_llm():
    global llm
    if llm is None:
        llm = OpenAI(temperature=0)
    return llm


def get_flare_chain(chmodel, vstore):
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


def get_rag_index(embeddings, user_id):
    vectorstore_u = get_vectorstore(embeddings, user_id=user_id)
    rag_index = VectorStoreIndexWrapper(vectorstore=vectorstore_u)
    return rag_index


def get_vectorstore(embeddings, user_id=None):
    """
    if user_id is None,
        we assume this is an init call:
        we require table provisioning (and pass a made-up user id)
    if user_id is passed:
        we spawn a no-provision instance set to that partition
    """
    vectorStore = Cassandra(
        embedding=embeddings,
        table_name=VECTOR_PDF_TABLE_NAME,
        partition_id="placeholder" if user_id is None else user_id,
        partitioned=True,
        skip_provisioning=user_id is not None,
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
        return load_pdf_from_file(pdf_file_path, vector_store), file_title
    except:
        return None, None
    finally:
        shutil.rmtree(tmp_dir)
