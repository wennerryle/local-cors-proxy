# Proxy CORS CLI

_not recommended for production_

#### Fixed fork from https://github.com/garmeeh/local-cors-proxy

(has volnurabilities and not support WebDAV)

Simple proxy to bypass CORS issues. This was built as a local dev only solution
to enable prototyping against existing APIs without having to worry about CORS.

This module was built to solve the issue of getting this error:

```
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disable
```

## Getting Started

Install it globally if you like use it like CLI

```bash
npm i -g proxy-cors-cli
```

---

or

Install it for project if you like npm commands

```bash
npm i -D proxy-cors-cli
```

You can use it in the scripts section of package.json.

For example:

```json
{
  "...": "...",
  "scripts": {
    "dev:corsproxy": "pcc -p http://192.168.4.1 -P 7244"
  }
}
```

## CLI

```bash
$ pcc --help
Usage: pcc --proxyUrl <your_proxy_url>
Usage: pcc -p <your_proxy_url>

Options:
      --help             Show help                                     [boolean]
      --version          Show version number                           [boolean]
  -p, --proxyUrl         The URL for proxying.                        [required]
  -P, --port             Port for the server.
  -o, --origin           Set Access-Control-Allow-Origin header.
  -c, --credentials      Set Access-Control-Allow-Credentials header to true
                                                                       [boolean]
      --ed, --enableDav  Support for WebDAV, CardDAV HTTP methods      [boolean]

Examples:
  -p  https://www.google.com
  -P  8010
  -o  http://localhost:4200
```
