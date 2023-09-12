#!/bin/bash

source /home/gitpod/.astra/cli/astra-init.sh
clear
astra setup
DB_NAME=`astra db list -o json | jq -r ' .data[] | select( .V != "") | select( .Status == "ACTIVE" ) | .Name '`
astra db create-dotenv "${DB_NAME}" -d .
/workspace/langchain-flare-pdf-qa-demo/scripts/ingest_openai_key.sh /workspace/langchain-flare-pdf-qa-demo/.env
cd /workspace/langchain-flare-pdf-qa-demo/api
pip install -r requirements.txt
uvicorn api:app