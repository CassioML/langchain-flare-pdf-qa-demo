# PDF FLARE demo with Langchain and Cassandra as Vector Store

## What

Ingest PDF files from their URL into an Astra DB vector store
and run FLARE Question-Answering on them.

Features:

- Python API (CassIO, LangChain, FastAPI) + React client (Typescript)
- per-user store of ingested documents
- Other Q-A methods in comparison
- Start-with-a-click on Gitpod

For some architectural/flow diagrams, check out [this dir](images/diagrams).

## Prerequisites

You need:

- an [Astra](https://astra.datastax.com) Vector Database (free tier is fine!). **You'll be asked to supply a [Database Administrator token](https://awesome-astra.github.io/docs/pages/astra/create-token/#c-procedure)**, the string starting with `AstraCS:...`;
- likewise, get your [Database ID](https://awesome-astra.github.io/docs/pages/astra/faq/#where-should-i-find-a-database-identifier) ready, you will have to enter it;
- an **OpenAI API Key**. (More info [here](https://cassio.org/start_here/#llm-access), note that out-of-the-box this demo supports OpenAI unless you tinker with the code.)

## How-to (Gitpod)

Click this button, confirm opening of the workspace
(you might need to do a Gitpod login in the process) and wait 1-2 minutes:
instructions will show up in the console below, where you'll have
to provide connection details and OpenAI key when prompted.

In the meantime, the app will open in the top panel.

<a href="https://gitpod.io/#https://github.com/cassioml/langchain-flare-pdf-qa-demo"><img src="images/open_in_gitpod.svg" /></a>

## How-to (local run)

### API

Create a Python `3.8+` virtual environment and install
the dependencies in `requirements.txt`.

Make a copy `cp .env.template .env` and set the secrets for your DB and OpenAI.

Finally enter the subdirectory and launch the API:

```
cd api
uvicorn api:app
```

#### Use a Cassandra cluster

To use a Cassandra cluster instead of Astra DB, check the `.env.template` file:
uncomment the `USE_CASSANDRA_CLUSTER` environment variable in your `.env`
and provide the necessary connection parameters (keyspace name, plus:
contact points and/or authentication if required).

The next time you start the API, it will attempt connecting to Cassandra.

### Client

You need a modern Node.js. Enter the subdirectory and install the dependencies:

```
cd app
npm install
```

If the API is running you can launch the client:

```
npm start
```

and point your browser to local port 3000.

_(Note: if the API run elsewhere, you can launch `REACT_APP_API_BASE_URL="http://something..." npm start`.)_

#### User journey

First, "log in" (mocked) with a made-up username.

Then you access the panel. Go to the "Docs" panel, where you can load pdf files
by entering their URL (click on the "i" icon to get example URLs to paste).

You can "Ask questions", comparing different methods (FLARE/RAG/Plain LLM) and
their answers.
