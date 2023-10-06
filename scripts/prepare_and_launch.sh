#!/bin/bash

REPO_HOME="/workspace/langchain-flare-pdf-qa-demo"

source /home/gitpod/.astra/cli/astra-init.sh
clear
echo    "=========================="

ASTRA_TOKEN="$(${REPO_HOME}/scripts/read_and_output_nonempty_secret.sh "Enter your Astra 'DB Admin' Token")";
echo -e "\nOK"
echo -e "ASTRA_DB_APPLICATION_TOKEN=\"${ASTRA_TOKEN}\"\n" > .env

DATABASE_ID=""
while [ -z "${DATABASE_ID}" ]; do
  echo -n "Enter your Database ID: "
  read DATABASE_ID
done
echo -e "\nOK"
echo -e "ASTRA_DB_ID=\"${DATABASE_ID}\"\n" >> .env

echo -n "(Optional) Enter your Keyspace: "
read KEYSPACE
echo -e "\nOK"
if [ ! -z "${KEYSPACE}" ]; then
  echo -e "ASTRA_DB_KEYSPACE=\"${KEYSPACE}\"\n" >> .env
fi

${REPO_HOME}/scripts/ingest_openai_key.sh ${REPO_HOME}/.env

cd /workspace/langchain-flare-pdf-qa-demo/api
pip install -r requirements.txt
uvicorn api:app
