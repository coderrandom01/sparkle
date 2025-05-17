declare module 'apollo-upload-client' {
import { ApolloLink } from '@apollo/client';
import { Httpoptions } from '@apollo/client/link/http';

export interface Uploadoptions extends Httpoptions {
// Optional override for ' FormData
FormData?: typeof FormData;
// Isomorphic request options.
// ['fetch options] (https://developer.mozilla.org/en-US/docs/Web/API/
// WindoworWorkerGlobalScope/fetch#Parameters).
requestOptions?: Omit<RequestInit, 'body' | 'headers' | 'method'>;
// / Isomorphic headers option.
 headers?: HeadersInit;
// Optional callback for tracking upload progress.
onProgress?: (progressEvent: ProgressEvent) => void;
}
export function createUploadLink(options?: UploadOptions): ApolloLink;
}