#!/bin/bash

DOTENV="$1"

clear
echo    "=========================="
while [ -z "$OPENAI_KEY" ]; do
  read -p "Enter your OpenAI API Key: " OPENAI_KEY
done

echo -e "\n\nOPENAI_API_KEY=\"${OPENAI_KEY}\"" >> "$DOTENV"
