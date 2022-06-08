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
  Team,
  TeamsTab
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

  async getChannels (teamIds: string[]): Promise<Map<string, Channel[]>> {
    return new Map(await Promise.all(
      teamIds.map<Promise<[string, Channel[]]>>(
        async (teamId) => {
          try {
            const response = await this.client
              .api(`/teams/${teamId}/channels`)
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
            return [ teamId, items.sort((a, b) => compare(a.displayName, b.displayName)) ];
          } catch {
            return [ teamId, []];
          }
        })));
  }

  async getGroups (): Promise<Map<string, Group>> {
    const values = new Map<string, Group>();
    const response = await this.client
      .api('/me/memberOf/microsoft.graph.group')
      .version('v1.0')
      .count(true)
      .select([
        'assignedLabels',
        'id',
        'mail'
      ])
      .filter('resourceProvisioningOptions/any(x:x eq \'Team\')')
      .orderby('displayName')
      .header('ConsistencyLevel', 'eventual')
      .get();
    const callback = (value: Group) => Boolean(value.id && values.set(value.id, value));
    const iterator = new PageIterator(this.client, response, callback);
    await iterator.iterate();
    return values;
  }

  async getDrives (teamIds: string[]): Promise<Map<string, Drive>> {
    const values = new Map<string, Drive>();
    for (let chunk = 0; chunk < teamIds.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        teamIds.slice(chunk, chunk + 20).map((teamId) => ({
          id: `${teamId}`,
          request: new Request(
            `/groups/${teamId}/drive` +
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

  async getMemberIcons (userIds: string[]): Promise<Map<string, Icon | null>> {
    const values = new Map<string, Icon | null>();
    for (let chunk = 0; chunk < userIds.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        userIds.slice(chunk, chunk + 20).map((userId) => ({
          id: `${userId}`,
          request: new Request(
            `/users/${userId}/photo/$value`,
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
      for (const [ requestId, response ] of Array.from(responseContent.getResponses())) {
        if (response.ok) {
          const data = await response.text();
          const type = response.headers.get('Content-Type');
          const icon = type
            ? {
                data: data,
                type: type
              }
            : null;
          values.set(requestId, icon);
        } else {
          values.set(requestId, null);
        }
      }
    }
    return values;
  }

  async getMembers (teamIds: string[]): Promise<Map<string, AadUserConversationMember[]>> {
    return new Map(await Promise.all(
      teamIds.map<Promise<[string, AadUserConversationMember[]]>>(
        async (teamId) => {
          try {
            const response = await this.client
              .api(`/teams/${teamId}/members`)
              .version('v1.0')
              .select([
                'displayName',
                'id',
                'microsoft.graph.aadUserConversationMember/userId',
                'microsoft.graph.aadUserConversationMember/email'
              ])
              .get();
            const items: AadUserConversationMember[] = [];
            const callback = (value: AadUserConversationMember) => Boolean(items.push(value));
            const iterator = new PageIterator(this.client, response, callback);
            await iterator.iterate();
            return [ teamId, items.sort((a, b) => compare(a.displayName, b.displayName)) ];
          } catch {
            return [ teamId, []];
          }
        })));
  }

  async getTabs (teamId: string, channelId: string): Promise<TeamsTab[]> {
    try {
      const response = await this.client
        .api(`/teams/${teamId}/channels/${channelId}/tabs?$expand=teamsApp`)
        .version('v1.0')
        .select([
          'displayName',
          'id',
          'webUrl'
        ])
        .get();
      const items: TeamsTab[] = [];
      const callback = (value: TeamsTab) => Boolean(items.push(value));
      const iterator = new PageIterator(this.client, response, callback);
      await iterator.iterate();
      return items;
    } catch {
      return [];
    }
  }

  async getTeamIcons (teamIds: string[]): Promise<Map<string, Icon | null>> {
    const values = new Map<string, Icon | null>();
    for (let chunk = 0; chunk < teamIds.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        teamIds.slice(chunk, chunk + 20).map((teamId) => ({
          id: `${teamId}`,
          request: new Request(
            `/groups/${teamId}/photo/$value`,
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
      for (const [ requestId, response ] of Array.from(responseContent.getResponses())) {
        if (response.ok) {
          const data = await response.text();
          const type = response.headers.get('Content-Type');
          const icon = type
            ? {
                data: data,
                type: type
              }
            : null;
          values.set(requestId, icon);
        } else {
          values.set(requestId, null);
        }
      }
    }
    return values;
  }

  async getTeams (teamIds: string[]): Promise<Map<string, Team>> {
    const values = new Map<string, Team>();
    for (let chunk = 0; chunk < teamIds.length; chunk += 20) {
      const requestContent = new BatchRequestContent(
        teamIds.slice(chunk, chunk + 20).map((teamId) => ({
          id: `${teamId}`,
          request: new Request(
            `/teams/${teamId}` +
            '?$select=description,displayName,id,internalId,visibility,webUrl',
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
      for (const [ requestId, response ] of responseContent.getResponses()) {
        if (response.ok) {
          const json = await response.json();
          const value = json as Team;
          values.set(requestId, value);
        } else if (response.status !== 404) {
          throw new Error(response.statusText);
        }
      }
    }
    return values;
  }

}
