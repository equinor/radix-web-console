import { randomBytes } from 'node:crypto'
import { fetch, Request, Response } from '@remix-run/web-fetch'

Object.defineProperties(global, {
  // Built-in lib.dom.d.ts expects `fetch(Request | string, ...)` but the web
  // fetch API allows a URL so @remix-run/web-fetch defines
  // `fetch(string | URL | Request, ...)`
  fetch: { value: fetch },
  // Same as above, lib.dom.d.ts doesn't allow a URL to the Request constructor
  Request: { value: Request },
  // web-std/fetch Response does not currently implement Response.error()
  Response: { value: Response },
})

Object.defineProperty(global.self, 'crypto', {
  value: { getRandomValues: (arr) => randomBytes(arr.length) },
})
