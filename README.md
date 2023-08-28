# PDF FLARE demo with Langchain and Cassandra as Vector Store

Ingest your PDFs and use FLARE for sophisticated multi-step question answering
over the documents' content.

## How-to

Python `3.8+` (suggested: a virtual environment).

Install the dependencies in `requirements.txt`.

Get an [Astra DB](https://astra.datastax.com) vector database (for free), download the Secure Connect Bundle and get a DB Administrator token.
(More info [here](https://cassio.org/start_here/#create-the-database).)

Get an OpenAI API Key.
(More info [here](https://cassio.org/start_here/#llm-access), note that out-of-the-box this demo supports OpenAI unless you tinker with the code.)

### Start API

Copy `cp .env.template .env` and set the secrets. Then `. .env`

Now, in this shell, go to the `api` directory and launch

```
uvicorn api:app
```

### Start the UI

In a separate console, go to the `app` directory and `npm install`.

When that has completed,

```
npm start
```

and point your browser to local port 3000.

#### User journey

First you "log in".

Then you load pdf by passing URLs to them.

Then you try to get questions answered.

#### Examples

Example valid URL to PDF files you can pass are:

```
https://github.com/CassioML/langchain-flare-pdf-qa-demo/blob/main/sources/nausea.pdf?raw=true
https://github.com/CassioML/langchain-flare-pdf-qa-demo/blob/main/sources/the_hobbit.pdf?raw=true
```

Example questions (one positive, one negative):

```
What about the chestnut?
What about the oak?
```

## TODOs and Caveats

No support for partitioning yet in the vector store.
As a result, every "user" would get their answers from the whole ingested corpus.
_The fix here is to implement optional partitioning support throughout the LangChain integration._
