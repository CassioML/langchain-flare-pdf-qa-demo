#!/bin/bash

REPO_HOME="/workspace/langchain-flare-pdf-qa-demo"

DOTENV="$1"

clear
echo    "=========================="
OPENAI_KEY="$(${REPO_HOME}/scripts/read_and_output_nonempty_secret.sh "Enter your OpenAI API Key")";
echo -e "\nOK"

echo -e "\n\nOPENAI_API_KEY=\"${OPENAI_KEY}\"" >> "$DOTENV"
