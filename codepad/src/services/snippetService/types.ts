import {AxiosPromise} from "axios";

export interface ISnippet {
    content: string
}

export interface INewSnippetUrlIdResponse {
    urlId: string
}

export interface ISnippetService {
    getSnippet: (snippetId: string) => AxiosPromise<ISnippet>
    getNewSnippetUrlId: () => AxiosPromise<INewSnippetUrlIdResponse>
    createSnippet: (snippetId: string, snippet: ISnippet) => AxiosPromise<ISnippet>
}