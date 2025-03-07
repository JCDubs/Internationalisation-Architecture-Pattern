#!/usr/bin/env node
/* eslint-disable n/no-unpublished-require */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable-next-line n/shebang */
const fs = require('fs');
const path = require('path');
const envConfig = require('dotenv').config();

if (!envConfig.parsed.COUNTRY) {
  throw Error(
    'Cannot generate dynamic paths. Please provide a COUNTRY environment variable.'
  );
}

const COUNTRY = envConfig.parsed.COUNTRY;
const globalPath = path.join(__dirname, '../src/global');
const srcDirs = fs.readdirSync(globalPath).filter(file => fs.lstatSync(`${globalPath}/${file}`).isDirectory());

const paths = {
  '@infra/*': Array.from(
    new Set([`infra/${COUNTRY}/*`, `infra/global/*`])
  ),
}

srcDirs.forEach(dir => {
  paths[`@${dir}/*`] = Array.from(
    new Set([`src/${COUNTRY}/${dir}/*`, `src/global/${dir}/*`])
  )
  paths[`@${dir}`] = Array.from(
    new Set([`src/${COUNTRY}/${dir}`, `src/global/${dir}`])
  )
});

const config = {
  extends: './node_modules/gts/tsconfig-google.json',
  compilerOptions: {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "esModuleInterop": true,
    "noUnusedParameters": false,
    "sourceMap": true,
    "resolveJsonModule": true,
    "inlineSourceMap": false,
    "inlineSources": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "typeRoots": [
      "./node_modules/@types"
    ],
    baseUrl: '.',
    paths,
  },
  exclude: ['node_modules', 'cdk.out'],
};

fs.writeFileSync(
  path.join(__dirname, '..', 'tsconfig.json'),
  JSON.stringify(config, null, 4)
);

console.log('Created ts-config.json file');
