import axios, {AxiosPromise} from 'axios'
import * as https from "https";

import {ISnippet, ISnippetService} from './types';

const devUrl = 'http://localhost:5000'
const prodUrl = 'https://codepad.online:5120'

const BASE_URL = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;
const SNIPPETS_API_URL = `${BASE_URL}/snippets`

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

export const snippetService : ISnippetService = {
  getSnippet: (snippetId: string) => {
    return instance.get(`${SNIPPETS_API_URL}/${snippetId}`)
  },

  getNewSnippetUrlId: () => {
    return instance.get(`${SNIPPETS_API_URL}/newUrlId`)
  },

  createSnippet: (snippetId: string, snippet: ISnippet) => {
    return instance.post(`${SNIPPETS_API_URL}/${snippetId}`, snippet)
  }
}