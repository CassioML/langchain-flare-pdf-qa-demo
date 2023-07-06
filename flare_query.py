import sys

import langchain
from langchain.chains import FlareChain
from langchain.vectorstores import Cassandra
from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings


from db import get_astra


if __name__ == '__main__':
    langchain.verbose = True

    # set up the vector store and make a retriever out of it
    embeddings = OpenAIEmbeddings()
    session, keyspace = get_astra()
    vectorstore = Cassandra(
        embedding=embeddings,
        session=session,
        keyspace=keyspace,
        table_name="flare_pdf_demo",
    )
    retriever = vectorstore.as_retriever()

    # for comparison
    llm = OpenAI()

    flare = FlareChain.from_llm(
        ChatOpenAI(temperature=0),
        retriever=retriever,
        max_generation_len=164,
        min_prob=0.3,
    )

    if sys.argv[1:] == []:
        query = "Compare the statistics to ascertain whether the number of elderly Americans in need for assisted living communities will increase in the next decade."
    else:
        query = " ".join(sys.argv[1:])

    flare_result = flare.run(query)
    llm_result = llm(query)

    print(f"QUERY: {query}\n\n")
    print(f"FLARE RESULT:\n    {flare_result}\n\n")
    print(f"LLM RESULT:\n    {llm_result}\n\n")
