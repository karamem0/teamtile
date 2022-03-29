//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  BatchRequestContent,
  BatchResponseContent,
  Client,
  PageIterator
} from '@microsoft/microsoft-graph-client';
import {
  AadUserConversationMember,
  Channel,
  Drive,
  Group,
  Team
} from '@microsoft/microsoft-graph-types';

import { Icon } from '../types/entity';
import { compare } from '../utils/compare';

export class GraphService {

  readonly client: Client;

  constructor (
    client: Client
  ) {
    this.client = client;
  }

  async getChannels (keys: string[]): Promise<Map<string, Channel[]>> {
    return new Map(await Promise.all(
      keys.map<Promise<[string, Channel[]]>>(
        async (key) => {
          try {
            const response = await this.client
              .api(`/teams/${key}/channels`)
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
            return [ key, items.sort((a, b) => compare(a.displayName, b.displayName)) ];
          } catch {
            return [ key, []];
          }
        })));
  }

  async getKeys (): Promise<string[]> {
    const values: string[] = [];
    const response = await this.client
      .api('/me/memberOf/microsoft.graph.group')
      .version('v1.0')
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

  async getDrives (keys: string[]): Promise<Map<string, Drive>> {
    const values = new Map<string, Drive>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((key) => ({
          id: `${key}`,
          request: new Request(
            `/groups/${key}/drive` +
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
      for (const [ key, response ] of responseContent.getResponses()) {
        if (response.ok) {
          const json = await response.json();
          const value = json as Drive;
          values.set(key, value);
        } else if (response.status !== 404) {
          throw new Error(response.statusText);
        }
      }
    }
    return values;
  }

  async getMemberIcons (keys: string[]): Promise<Map<string, Icon | null>> {
    const values = new Map<string, Icon | null>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((key) => ({
          id: `${key}`,
          request: new Request(
            `/users/${key}/photo/$value`,
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
      for (const [ key, response ] of Array.from(responseContent.getResponses())) {
        if (response.ok) {
          const data = await response.text();
          const type = response.headers.get('Content-Type');
          const icon = type
            ? {
                data: data,
                type: type
              }
            : null;
          values.set(key, icon);
        } else {
          values.set(key, null);
        }
      }
    }
    return values;
  }

  async getMembers (keys: string[]): Promise<Map<string, AadUserConversationMember[]>> {
    return new Map(await Promise.all(
      keys.map<Promise<[string, AadUserConversationMember[]]>>(
        async (key) => {
          try {
            const response = await this.client
              .api(`/teams/${key}/members`)
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
            return [ key, items.sort((a, b) => compare(a.displayName, b.displayName)) ];
          } catch {
            return [ key, []];
          }
        })));
  }

  async getTeamIcons (keys: string[]): Promise<Map<string, Icon | null>> {
    const values = new Map<string, Icon | null>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((key) => ({
          id: `${key}`,
          request: new Request(
            `/groups/${key}/photo/$value`,
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
      for (const [ key, response ] of Array.from(responseContent.getResponses())) {
        if (response.ok) {
          const data = await response.text();
          const type = response.headers.get('Content-Type');
          const icon = type
            ? {
                data: data,
                type: type
              }
            : null;
          values.set(key, icon);
        } else {
          values.set(key, null);
        }
      }
    }
    return values;
  }

  async getTeams (keys: string[]): Promise<Map<string, Team>> {
    const values = new Map<string, Team>();
    for (let chunk = 0; chunk < keys.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        keys.slice(chunk, chunk + 20).map((key) => ({
          id: `${key}`,
          request: new Request(
            `/teams/${key}` +
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
      for (const [ key, response ] of responseContent.getResponses()) {
        if (response.ok) {
          const json = await response.json();
          const value = json as Team;
          values.set(key, value);
        } else if (response.status !== 404) {
          throw new Error(response.statusText);
        }
      }
    }
    return values;
  }

}
