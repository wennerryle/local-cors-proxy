#!/usr/bin/env node
// @ts-check

import startProxy from "../lib/index.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

const argsBuilder = yargs(hideBin(process.argv));

// var optionDefinitions = [
//   { name: 'port', alias: 'p', type: Number, defaultValue: 8010 },
//   {
//     name: 'proxyPartial',
//     type: String,
//     defaultValue: '/proxy'
//   },
//   { name: 'proxyUrl', type: String },
//   { name: 'credentials', type: Boolean, defaultValue: false },
//   { name: 'origin', type: String, defaultValue: '*' }
// ];

// prettier-ignore
const args = await argsBuilder
  .demandOption (["p"])
  .usage    ("Usage: lcp --proxyUrl <your_proxy_url>")
  .usage    ("Usage: lcp -p <your_proxy_url>")
  .alias    ("p" , "proxyUrl")
  .describe ("p" , "The URL for proxying.")
  .example  ("-p", "https://www.google.com")
  .alias    ("P" , "port")
  .example  ("-P", "8010")
  .describe ("P" , "Port for the server.")
  .alias    ("o" , "origin")
  .describe ("o" , "Set Access-Control-Allow-Origin header.")
  .example  ("-o", "http://localhost:4200")
  .parse    ();

// prettier-ignore
const proxyUrl     = args.proxyUrl,
      port         = args.port         ?? 8010,
      proxyPartial = args.proxyPartial ?? "/proxy",
      credentials  = args.credentials  ?? false,
      origin       = args.origin       ?? "*";

if (proxyUrl) {
  try {
    startProxy(
      port,
      String(proxyUrl),
      String(proxyPartial),
      credentials,
      origin
    );
  } catch {
    chalk.bgRedBright.black.bold.underline(
      "\n Failed to start server! Please check your options. \n"
    );
  }
} else {
  console.log(
    "port: %i, proxyUrl: %s, proxyPartial: %s, credentials: %s, origin: %s",
    port,
    proxyUrl,
    proxyPartial,
    credentials,
    origin
  );
}
