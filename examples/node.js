// LinkedIn Company Scraper - Node.js example
// Requires: Node 18+, APIFY_TOKEN env var
//   npm install apify-client

import { readFile } from 'node:fs/promises';
import { ApifyClient } from 'apify-client';

const TOKEN = process.env.APIFY_TOKEN;
if (!TOKEN) {
    console.error('Set APIFY_TOKEN env var. Get one at https://console.apify.com/account/integrations');
    process.exit(1);
}

const input = JSON.parse(await readFile(new URL('./input.json', import.meta.url), 'utf8'));

const client = new ApifyClient({ token: TOKEN });
const run = await client.actor('agnes.developer.queen/linkedin-company-scraper').call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();

for (const row of items) {
    console.log(row.input, '->', row.name, '|', row.industry, '|', row.companySize, '|', row.headquarters, '| charged:', row.charged);
}
