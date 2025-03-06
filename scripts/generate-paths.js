#!/usr/bin/env node
/* eslint-disable n/no-unpublished-require */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable-next-line n/shebang */
const fs = require('fs');
const path = require('path');
require('dotenv').config();

if (!process.env.COUNTRY) {
  throw Error(
    'Cannot generate dynamic paths. Please provide a COUNTRY environment variable.'
  );
}

const config = {
  extends: './node_modules/gts/tsconfig-google.json',
  compilerOptions: {
    baseUrl: '.',
    paths: {
      '@infra/*': Array.from(
        new Set([`infra/${process.env.COUNTRY}/*`, `infra/global/*`])
      ),
      '@schemas/*': Array.from(
        new Set([
          `src/${process.env.COUNTRY}/schemas/*`,
          `src/global/schemas/*`,
        ])
      ),
      '@models/*': Array.from(
        new Set([`src/${process.env.COUNTRY}/models/*`, `src/global/models/*`])
      ),
      '@dto/*': Array.from(
        new Set([`src/${process.env.COUNTRY}/dto/*`, `src/global/dto/*`])
      ),
      '@config/*': Array.from(
        new Set([`src/${process.env.COUNTRY}/config/*`, `src/global/config/*`])
      ),
      "@adapters/*": Array.from(
        new Set([`src/${process.env.COUNTRY}/adapters/*`, `src/global/adapters/*`])
      ),
      "@entity/*": Array.from(
        new Set([`src/${process.env.COUNTRY}/entity/*`, `src/global/entity/*`])
      ),
      "@errors/*": Array.from(
        new Set([`src/${process.env.COUNTRY}/errors/*`, `src/global/errors/*`])
      ),
      "@repositories/*": Array.from(
        new Set([`src/${process.env.COUNTRY}/repositories/*`, `src/global/repositories/*`])
      ),
      "@shared/*": Array.from(
        new Set([`src/${process.env.COUNTRY}/shared/*`, `src/global/shared/*`])
      ),
      "@use-cases/*": Array.from(
        new Set([`src/${process.env.COUNTRY}/use-cases/*`, `src/global/use-cases/*`])
      ),
      "@constants/*": Array.from(
        new Set([`src/${process.env.COUNTRY}/constants/*`, `src/global/constants/*`])
      ),
      "@test-utils": [
        "test/utils"
      ]
    },
  },
  exclude: ['node_modules', 'cdk.out'],
};

fs.writeFileSync(
  path.join(__dirname, '..', '.ts-path-config.json'),
  JSON.stringify(config, null, 4)
);

console.log('Created .ts-path-config.json file with content');
