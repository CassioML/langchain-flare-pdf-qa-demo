#!/bin/bash
#
# Read and echo a password, echoing responsive 'stars' for input characters
# Also handles: backspaces, deleted and ^U (kill-line) control-chars
#
# Lightly adapted from: https://stackoverflow.com/questions/63778473/bash-masking-user-input-for-a-password-with-support-for-backspace-and-specia
#
PROMPT="$1";
PROMPT=${PROMPT:-"Enter secret"};
IS_NOT_FIRST="$2";
unset PWORD;
#
if [ -z "${IS_NOT_FIRST}" ]; then
  echo -en "${PROMPT}: " 1>&2;
else
  echo -en "\n${PROMPT}: " 1>&2;
fi
#
while true; do
  IFS= read -r -N1 -s char
  # Note a NULL will return a empty string
  # Convert users key press to hexadecimal character code
  code=$(printf '%02x' "'$char") # EOL (empty char) -> 00
  case "$code" in
  ''|0a|0d) break ;;   # Exit EOF, Linefeed or Return
  08|7f)  # backspace or delete
      if [ -n "$PWORD" ]; then
        PWORD="$( echo "$PWORD" | sed 's/.$//' )"
        echo -n $'\b \b' 1>&2
      fi
      ;;
  15)  # ^U or kill line
      echo -n "$PWORD" | sed 's/./\cH \cH/g' >&2
      PWORD=''
      ;;
  [01]?) ;;  # Ignore ALL other control characters
  *)  PWORD="$PWORD$char"
      echo -n '*' 1>&2
      ;;
  esac
done
# echo
echo $PWORD
