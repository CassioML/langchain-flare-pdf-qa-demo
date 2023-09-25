#!/bin/bash

source /home/gitpod/.astra/cli/astra-init.sh
clear
echo    "=========================="
ASTRA_TOKEN="$(/workspace/langchain-flare-pdf-qa-demo/scripts/read_and_output_nonempty_secret.sh "Enter your Astra Token")";
echo -e "\nOK"
astra setup -t "${ASTRA_TOKEN}"
DB_NAMES=`astra db list -o json | jq -r ' .data[] | select( .V != "") | select( .Status == "ACTIVE" ) | .Name '`
# are there exactly 1 DB?
NUM_DBS=`echo ${DB_NAMES} | wc -w`
if [ "${NUM_DBS}" -eq "1" ]; then
  DB_NAME="${DB_NAMES}"
else
  if [ "${NUM_DBS}" -eq "0" ]; then
    echo "ERROR: No active vector database found. Please rectify and launch this again:";
    echo "    /workspace/langchain-flare-pdf-qa-demo/scripts/launch_api.sh";
    exit 0;
  else
    echo "Choose your target vector database (enter number):";
    select CHOSEN_DB in `echo "${DB_NAMES}"`;
    do
      if [ ! -z "${CHOSEN_DB}" ]; then
        break;
      fi
    done
    DB_NAME="${CHOSEN_DB}";
  fi
fi
#
astra db create-dotenv "${DB_NAME}" -d .
/workspace/langchain-flare-pdf-qa-demo/scripts/ingest_openai_key.sh /workspace/langchain-flare-pdf-qa-demo/.env
cd /workspace/langchain-flare-pdf-qa-demo/api
pip install -r requirements.txt
uvicorn api:app
