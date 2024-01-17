//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import {
  BatchRequestContent,
  BatchResponseContent,
  PageIterator
} from '@microsoft/microsoft-graph-client';

import { getConfig } from '../../../config/GraphConfig';
import {
  Channel,
  Drive,
  Group,
  Icon,
  Member,
  Tab,
  Team
} from '../../../types/Entity';
import { compare } from '../../../utils/String';
import {
  mapChannel,
  mapDrive,
  mapGroup,
  mapMember,
  mapTab,
  mapTeam
} from '../mappings/AutoMapperProfile';

export async function getChannels(teamId: string): Promise<Channel[]> {
  const { client } = getConfig();
  const response = await client
    .api(`/teams/${teamId}/channels`)
    .version('v1.0')
    .select([
      'id',
      'displayName',
      'webUrl',
      'membershipType'
    ])
    .get();
  const values: Channel[] = [];
  const iterator = new PageIterator(
    client,
    response,
    (value) => Boolean(values.push(mapChannel(value))));
  await iterator.iterate();
  return values.sort((a, b) => compare(a.displayName, b.displayName));
}

export async function getDrive(teamId: string): Promise<Drive> {
  const { client } = getConfig();
  const response = await client
    .api(`/groups/${teamId}/drive`)
    .version('v1.0')
    .select([
      'id',
      'webUrl'
    ])
    .get();
  return mapDrive(response);
}

export async function getGroups(): Promise<Group[]> {
  const { client } = getConfig();
  const response = await client
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
  const values: Group[] = [];
  const iterator = new PageIterator(
    client,
    response,
    (value) => Boolean(values.push(mapGroup(value))));
  await iterator.iterate();
  return values;
}

export async function getMemberIcons(userIds: string[]): Promise<Icon[]> {
  const { client } = getConfig();
  const values: Icon[] = [];
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
    const responseBody = await client
      .api('/$batch')
      .version('v1.0')
      .post(requestBody);
    const responseContent = new BatchResponseContent(responseBody);
    for (const [ requestId, response ] of Array.from(responseContent.getResponses())) {
      if (response.ok) {
        const data = await response.text();
        const type = response.headers.get('Content-Type');
        values.push({
          id: requestId,
          data: `data:${type};base64,${data}`
        });
      } else {
        values.push({
          id: requestId,
          data: undefined
        });
      }
    }
  }
  return values;
}

export async function getMembers(teamId: string): Promise<Member[]> {
  const { client } = getConfig();
  const response = await client
    .api(`/teams/${teamId}/members`)
    .version('v1.0')
    .select([
      'displayName',
      'id',
      'microsoft.graph.aadUserConversationMember/userId',
      'microsoft.graph.aadUserConversationMember/email'
    ])
    .get();
  const values: Member[] = [];
  const iterator = new PageIterator(
    client,
    response,
    (value) => Boolean(values.push(mapMember(value))));
  await iterator.iterate();
  return values.sort((a, b) => compare(a.displayName, b.displayName));
}

export async function getTabs(teamId: string, channelId: string): Promise<Tab[]> {
  const { client } = getConfig();
  const response = await client
    .api(`/teams/${teamId}/channels/${channelId}/tabs?$expand=teamsApp`)
    .version('v1.0')
    .select([
      'displayName',
      'id',
      'webUrl'
    ])
    .get();
  const values: Tab[] = [];
  const iterator = new PageIterator(
    client,
    response,
    (value) => Boolean(values.push(mapTab(value))));
  await iterator.iterate();
  return values;
}

export async function getTeamIcons(teamIds: string[]): Promise<Icon[]> {
  const { client } = getConfig();
  const values: Icon[] = [];
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
    const responseBody = await client
      .api('/$batch')
      .version('v1.0')
      .post(requestBody);
    const responseContent = new BatchResponseContent(responseBody);
    for (const [ requestId, response ] of Array.from(responseContent.getResponses())) {
      if (response.ok) {
        const data = await response.text();
        const type = response.headers.get('Content-Type');
        values.push({
          id: requestId,
          data: `data:${type};base64,${data}`
        });
      } else {
        values.push({
          id: requestId,
          data: undefined
        });
      }
    }
  }
  return values;
}

export async function getTeams(teamIds: string[]): Promise<Team[]> {
  const { client } = getConfig();
  const values: Team[] = [];
  for (let chunk = 0; chunk < teamIds.length; chunk += 20) {
    const requestContent = new BatchRequestContent(
      teamIds.slice(chunk, chunk + 20).map((teamId) => ({
        id: teamId,
        request: new Request(
          `/teams/${teamId}` +
          `?$select=${[
            'description',
            'displayName',
            'id',
            'internalId',
            'isArchived',
            'visibility',
            'webUrl'
          ].join(',')}`,
          {
            method: 'GET'
          }
        )
      }))
    );
    const requestBody = await requestContent.getContent();
    const responseBody = await client
      .api('/$batch')
      .version('v1.0')
      .post(requestBody);
    const responseContent = new BatchResponseContent(responseBody);
    for (const [ , response ] of responseContent.getResponses()) {
      if (response.ok) {
        const json = await response.json();
        const value = mapTeam(json);
        values.push(value);
      } else {
        switch (response.status) {
          case 403:
          case 404:
            break;
          default:
            throw new Error(`${response.status}: ${response.statusText}`);
        }
      }
    }
  }
  return values;
}
