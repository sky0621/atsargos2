#!/bin/bash -e

# shellcheck disable=SC2039
services=(
    run.googleapis.com \
)

# shellcheck disable=SC2039
for service in "${services[@]}"
do
  gcloud services enable "${service}"
done
