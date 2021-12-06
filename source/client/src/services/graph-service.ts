//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Microsoft Graph
import {
  AadUserConversationMember,
  Channel,
  Drive,
  Group,
  Team
} from '@microsoft/microsoft-graph-types';
import {
  BatchRequestContent,
  BatchResponseContent,
  Client,
  PageIterator
} from '@microsoft/microsoft-graph-client';
// Utils
import { compare } from '../utils/compare';

export class GraphService {

  readonly client: Client;

  constructor (
    client: Client
  ) {
    this.client = client;
  }

  async getKeys (): Promise<string[]> {
    const values: string[] = [];
    const response = await this.client
      .api('/me/memberOf/microsoft.graph.group')
      .version('beta')
      .count(true)
      .select('id')
      .filter('resourceProvisioningOptions/any(x:x eq \'Team\')')
      .orderby('displayName')
      .header('ConsistencyLevel', 'eventual')
      .get();
    const callback = (value: Group) => Boolean(value.id && values.push(value.id));
    const iterator = new PageIterator(this.client, response, callback);
    await iterator.iterate();
    return values;
  }

  async getTeams (keys: string[]): Promise<Map<string, Team>> {
    const values = new Map<string, Team>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((id) => ({
          id: `${id}`,
          request: new Request(
            `/teams/${id}` +
            '?$select=id,displayName,description,internalId,visibility,webUrl',
            {
              method: 'GET'
            }
          )
        }))
      );
      const requestBody = await requestContent.getContent();
      const responseBody = await this.client
        .api('/$batch')
        .version('v1.0')
        .post(requestBody);
      const responseContent = new BatchResponseContent(responseBody);
      for (const [ id, response ] of responseContent.getResponses()) {
        if (response.ok) {
          const json = await response.json();
          const value = json as Team;
          values.set(id, value);
        }
      }
    }
    return values;
  }

  async getTeamIcons (keys: string[]): Promise<Map<string, string | null>> {
    const values = new Map<string, string | null>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((id) => ({
          id: `${id}`,
          request: new Request(
            `/groups/${id}/photo/$value`,
            {
              method: 'GET'
            }
          )
        }))
      );
      const requestBody = await requestContent.getContent();
      const responseBody = await this.client
        .api('/$batch')
        .version('v1.0')
        .post(requestBody);
      const responseContent = new BatchResponseContent(responseBody);
      for (const [ id, response ] of Array.from(responseContent.getResponses())) {
        if (response.ok) {
          values.set(id, await response.text());
        } else {
          values.set(id, null);
        }
      }
    }
    return values;
  }

  async getChannels (keys: string[]): Promise<Map<string, Channel[]>> {
    return new Map(await Promise.all(
      keys.map<Promise<[string, Channel[]]>>(
        async (id) => {
          try {
            const response = await this.client
              .api(`/teams/${id}/channels`)
              .version('v1.0')
              .select([
                'id',
                'displayName',
                'webUrl',
                'membershipType'
              ])
              .get();
            const items: Channel[] = [];
            const callback = (value: Channel) => Boolean(items.push(value));
            const iterator = new PageIterator(this.client, response, callback);
            await iterator.iterate();
            return [ id, items.sort((a, b) => compare(a.displayName, b.displayName)) ];
          } catch {
            return [ id, []];
          }
        })));
  }

  async getMembers (keys: string[]): Promise<Map<string, AadUserConversationMember[]>> {
    return new Map(await Promise.all(
      keys.map<Promise<[string, AadUserConversationMember[]]>>(
        async (id) => {
          try {
            const response = await this.client
              .api(`/teams/${id}/members`)
              .version('v1.0')
              .select([
                'id',
                'displayName',
                'microsoft.graph.aadUserConversationMember/userId',
                'microsoft.graph.aadUserConversationMember/email' ])
              .get();
            const items: AadUserConversationMember[] = [];
            const callback = (value: AadUserConversationMember) => Boolean(items.push(value));
            const iterator = new PageIterator(this.client, response, callback);
            await iterator.iterate();
            return [ id, items.sort((a, b) => compare(a.displayName, b.displayName)) ];
          } catch {
            return [ id, []];
          }
        })));
  }

  async getMemberIcons (keys: string[]): Promise<Map<string, string | null>> {
    const values = new Map<string, string | null>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((id) => ({
          id: `${id}`,
          request: new Request(
            `/users/${id}/photo/$value`,
            {
              method: 'GET'
            }
          )
        }))
      );
      const requestBody = await requestContent.getContent();
      const responseBody = await this.client
        .api('/$batch')
        .version('v1.0')
        .post(requestBody);
      const responseContent = new BatchResponseContent(responseBody);
      for (const [ id, response ] of Array.from(responseContent.getResponses())) {
        if (response.ok) {
          values.set(id, await response.text());
        } else {
          values.set(id, null);
        }
      }
    }
    return values;
  }

  async getDrives (keys: string[]): Promise<Map<string, Drive>> {
    const values = new Map<string, Drive>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((id) => ({
          id: `${id}`,
          request: new Request(
            `/groups/${id}/drive` +
            '?$select=id,webUrl',
            {
              method: 'GET'
            }
          )
        }))
      );
      const requestBody = await requestContent.getContent();
      const responseBody = await this.client
        .api('/$batch')
        .version('v1.0')
        .post(requestBody);
      const responseContent = new BatchResponseContent(responseBody);
      for (const [ id, response ] of responseContent.getResponses()) {
        if (response.ok) {
          const json = await response.json();
          const value = json as Drive;
          values.set(id, value);
        }
      }
    }
    return values;
  }

}
