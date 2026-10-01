"""LinkedIn Company Scraper - Python example.

Requires: apify-client, APIFY_TOKEN env var.
    pip install apify-client
"""

import json
import os
import sys
from pathlib import Path

from apify_client import ApifyClient

TOKEN = os.environ.get("APIFY_TOKEN")
if not TOKEN:
    print("Set APIFY_TOKEN env var. Get one at https://console.apify.com/account/integrations")
    sys.exit(1)

run_input = json.loads((Path(__file__).parent / "input.json").read_text())

client = ApifyClient(TOKEN)
run = client.actor("agnes.developer.queen/linkedin-company-scraper").call(run_input=run_input)

for row in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(row["input"], "->", row["name"], "|", row["industry"], "|", row["companySize"],
          "|", row["headquarters"], "| charged:", row["charged"])
