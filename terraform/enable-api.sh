#!/bin/bash -e

# shellcheck disable=SC2039
services=(
    artifactregistry.googleapis.com \
    run.googleapis.com \
    iamcredentials.googleapis.com \
    cloudscheduler.googleapis.com \
)

# shellcheck disable=SC2039
for service in "${services[@]}"
do
  gcloud services enable "${service}"
done
