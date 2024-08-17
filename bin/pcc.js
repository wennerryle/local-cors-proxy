#!/usr/bin/env node
// @ts-check
import startProxy from "../lib/index.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

const argsBuilder = yargs(hideBin(process.argv));

// prettier-ignore
const args = await argsBuilder
  .usage    ("Usage: lcp --proxyUrl <your_proxy_url>")
  .usage    ("Usage: lcp -p <your_proxy_url>")
  // PROXY URL
  .alias       ("p" , "proxyUrl")
  .describe    ("p" , "The URL for proxying.")
  .example     ("-p", "https://www.google.com")
  .demandOption("p")
  // PORT
  .alias    ("P" , "port")
  .example  ("-P", "8010")
  .describe ("P" , "Port for the server.")
  // ORIGIN
  .alias    ("o" , "origin")
  .describe ("o" , "Set Access-Control-Allow-Origin header.")
  .example  ("-o", "http://localhost:4200")
  // CREDENTIALS
  .alias    ("c", "credentials")
  .describe ("c", "Set Access-Control-Allow-Credentials header to true")
  .boolean  ("c")
  // ENABLE DAV
  .alias    ("ed", "enableDav")
  .describe ("ed", "Support for WebDAV, CardDAV HTTP methods")
  .boolean  ("ed")
  .parse();

// prettier-ignore
const proxyUrl     = args.proxyUrl,
      port         = args.port         ?? 8010,
      proxyPartial = args.proxyPartial ?? "/proxy",
      credentials  = args.credentials  || false,
      origin       = args.origin,
      enableDAV    = args.enableDav

console.log("enableDav is", enableDAV);

try {
  startProxy(
    port,
    String(proxyUrl),
    String(proxyPartial),
    Boolean(credentials),
    typeof origin === "string" ? origin : undefined,
    typeof enableDAV === "boolean" ? enableDAV : false
  );
} catch {
  chalk.bgRedBright.black.bold.underline(
    "\n Failed to start server! Please check your options. \n"
  );
}
