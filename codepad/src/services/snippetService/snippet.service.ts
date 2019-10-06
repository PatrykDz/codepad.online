import axios, {AxiosPromise} from 'axios'
import * as https from "https";

import {ISnippet, ISnippetService} from './types';

// const BASE_URL = 'http://codepad.online'
// const BASE_URL = 'http://localhost:5000'
const BASE_URL = 'http://codepad.online:5120'
const SNIPPETS_API_URL = `${BASE_URL}/snippets`

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

export const snippetService : ISnippetService = {
  getSnippet: (snippetId: string) => {
    return instance.get(`${SNIPPETS_API_URL}/${snippetId}`)
  },

  createSnippet: (snippetId: string, snippet: ISnippet) => {
    return instance.post(`${SNIPPETS_API_URL}/${snippetId}`, snippet)
  }
}