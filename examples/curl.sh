#!/usr/bin/env bash
# LinkedIn Company Scraper - curl example
# Requires: APIFY_TOKEN env var, jq

set -euo pipefail

if [ -z "${APIFY_TOKEN:-}" ]; then
    echo "Set APIFY_TOKEN env var first. Get one at https://console.apify.com/account/integrations"
    exit 1
fi

INPUT="$(dirname "$0")/input.json"

curl -s -X POST \
    "https://api.apify.com/v2/acts/agnes.developer.queen~linkedin-company-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}" \
    -H "Content-Type: application/json" \
    --data-binary "@${INPUT}" \
    | jq -r '.[] | [.input, .name, .industry, .companySize, .headquarters, .charged] | @tsv'
