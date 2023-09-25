#!/bin/bash
#
# Input of secrets with asterisk-mask on screen.
# The secret is ECHOED BACK, so make sure you use this in another script, like:
#   MY_PWD="$(./read_and_output_nonempty_secret.sh "Enter secret")";
#   ... do something with ${MY_PWD} ...
# Usage:
#   ./read_and_output_nonempty_secret.sh "PROMPT"
#   ./read_and_output_nonempty_secret.sh "PROMPT" CAN_BE_EMPTY
# CAN_BE_EMPTY is either
#   "0" (default: question is repeated until input is given)
#   "1" accept empty user input and go on
#

# Adapted from: https://stackoverflow.com/questions/59895/how-do-i-get-the-directory-where-a-bash-script-is-located-from-within-the-script
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd );

PROMPT="$1";
CAN_BE_EMPTY="$2";
CAN_BE_EMPTY=${CAN_BE_EMPTY:-"0"};
SECRET="";
IS_NOT_FIRST="";

if [ "${CAN_BE_EMPTY}" -eq "0" ]; then
  while [ -z "${SECRET}" ]; do
    SECRET="$($SCRIPT_DIR/read_and_output_secret.sh "${PROMPT}" "${IS_NOT_FIRST}")";
    IS_NOT_FIRST="1";
  done
else
  SECRET="$(./read_and_output_secret.sh "${PROMPT}" "${IS_NOT_FIRST}")";
fi
echo "${SECRET}";
