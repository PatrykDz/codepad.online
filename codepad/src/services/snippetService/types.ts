import {AxiosPromise} from "axios";

export interface ISnippet {
    content: string
}

export interface ISnippetService {
    getSnippet: (snippetId: string) => AxiosPromise<ISnippet>
    createSnippet: (snippetId: string, snippet: ISnippet) => AxiosPromise<ISnippet>
}