#!/usr/bin/env bash

S3_LIVE_BUCKET= "s3://TODO-ADD-BUCKET"
CF_MAIN_DISTRIBUTION= "TODO-ADD-ID"
CF_REDIRECT_DISTRIBUTION= "TODO-ADD-ID"

# Error Handling Function
error_handle() {
echo
echo "${RED}[ ERROR ] || ${BLACKMESA}: $1${NC}"
echo
exit 1
}

# Color Variables
ORANGE=`tput setaf 5`
GREEN=`tput setaf 2`
RED=`tput setaf 1`
YELLOW=`tput setaf 3`
NC=`tput sgr0`

echo "${YELLOW}"
echo "======================================================================================"
echo "${YELLOW} || THIS SCRIPT DEPLOYS CHANGES TO LIVE ENVIRONMENT ||${NC}"
echo "======================================================================================"
echo
echo
sleep 1s
read -p "${YELLOW}Are you absolutely sure? please type YES or NO (case sensitive)${NC}  " confirmation

if [ $confirmation == "YES" ]
then
  # Clean old build files
  echo "${YELLOW}[ Cleaning old build files ]${NC}"
  npm run clean
  # Build from most recent master
  echo "${GREEN}[ Building from Master ]${NC}"
  git fetch && git checkout master
  npm run clean
  npm run build
  # Deploy dist folder to AWS
  echo "${GREEN}[ Deploying to AWS ${S3_LIVE_BUCKET} ]${NC}"
  if aws s3 sync dist $S3_LIVE_BUCKET
  then
    echo "${GREEN}[ Deploying Changes to Cloudfront ]${NC}"
    # INVALIDATE RECORDS ON MAIN DISTRIBUTION
    aws cloudfront create-invalidation --distribution-id $CF_MAIN_DISTRIBUTION --paths /
    # INVALIDATE RECORDS ON SECONDARY DISTRIBUTION
    aws cloudfront create-invalidation --distribution-id $CF_REDIRECT_DISTRIBUTION --paths /
    echo "${GREEN}[ Changes Successfully Deployed to AWS! ]${NC}"
    npm run clean
    exit 0
  else
    error_handle "Something went wrong while deploying to AWS"
  fi
else
  error_handle "Try again when ready"
fi
