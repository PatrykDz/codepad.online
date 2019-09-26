import {AxiosPromise} from "axios";

export interface ISnippetService {
    getSnippet: (snippetId: string) => AxiosPromise<any>
    createSnippet: (snippetId: string, data: any) => AxiosPromise<any>
}