import * as microsoftGraph from '@microsoft/microsoft-graph-types';

export type MicrosoftGraphResponse = MicrosoftGraphValueResponse | MicrosoftGraphArrayResponse | MicrosoftGraphErrorResponse;

export interface MicrosoftGraphValueResponse extends microsoftGraph.Entity
{
  '@odata.context': string;
}

export interface MicrosoftGraphArrayResponse {
  '@odata.context': string;
  '@odata.count': number;
  '@odata.nextLink': string;
  value: microsoftGraph.Entity[];
}

export interface MicrosoftGraphBatchResponse {
  id: string;
  status: number;
  body: MicrosoftGraphResponse;
}

export interface MicrosoftGraphErrorResponse {
  error: microsoftGraph.GenericError;
}
