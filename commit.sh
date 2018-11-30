#!/bin/bash
dt=$(date '+%d/%m/%Y %H:%M:%S')
message = " "
echo $message
if [[ -n "$1" ]]
then
    message="$1"
else
    message="Update App $dt"
fi    
echo $message
git add .
git commit -m "$message" 
git push -u origin master

