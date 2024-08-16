// @ts-check
import express from "express";
import cors from "cors";
import chalk from "chalk";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const corsHeader = "access-control-allow-origin";

export default function startProxy(
  port,
  /** @type string */ proxyUrl,
  /** @type string */ proxyPartial,
  credentials,
  origin
) {
  app.use(cors({ credentials: credentials, origin: origin }));
  app.options("*", cors({ credentials: credentials, origin: origin }));

  const proxyMiddleware = createProxyMiddleware({
    target: proxyUrl,
    changeOrigin: true,
    on: {
      proxyReq: (proxyRes, req) => {
        console.log(chalk.green("Request Proxied -> " + req.url));
        const accessControlAllowOriginHeader = proxyRes
          .getHeader(corsHeader)
          ?.toString();

        if (
          accessControlAllowOriginHeader &&
          accessControlAllowOriginHeader !== origin
        ) {
          console.log(
            chalk.blue(
              "Override access-control-allow-origin header from proxified URL : " +
                chalk.green(accessControlAllowOriginHeader) +
                "\n"
            )
          );
          proxyRes.setHeader("access-control-allow-origin", origin);
        }
      },
    },
  });

  // remove trailing slash
  const cleanProxyUrl = proxyUrl.replace(/\/$/, "");
  // remove all forward slashes
  const cleanProxyPartial = proxyPartial.replace(/\//g, "");

  app.use("/" + cleanProxyPartial, proxyMiddleware);

  app.listen(port);

  // Welcome Message
  console.log(chalk.bgGreen.black.bold.underline("\n Proxy Active \n"));
  console.log(chalk.blue("Proxy Url: " + chalk.green(cleanProxyUrl)));
  console.log(chalk.blue("Proxy Partial: " + chalk.green(cleanProxyPartial)));
  console.log(chalk.blue("PORT: " + chalk.green(port)));
  console.log(chalk.blue("Credentials: " + chalk.green(credentials)));
  console.log(chalk.blue("Origin: " + chalk.green(origin) + "\n"));
  console.log(
    chalk.cyan(
      "To start using the proxy simply replace the proxied part of your url with: " +
        chalk.bold("http://localhost:" + port + "/" + cleanProxyPartial + "\n")
    )
  );
}
