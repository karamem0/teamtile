//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import {
  BatchRequestContent,
  BatchResponseContent
} from '@microsoft/microsoft-graph-client';
import * as microsoftClient from '@microsoft/microsoft-graph-types';
import { Team } from '../types/team';
import { useAppContext } from '../contexts/app-context';
import { useIndexedDb } from '../contexts/indexed-db-context';

interface TeamProps {
  id: string
}

const useTeam = ({ id }: TeamProps): [ Team | undefined ] => {

  const { client, setError } = useAppContext();
  const { db } = useIndexedDb();
  const [ team, setTeam ] = React.useState<Team | undefined>();

  const getTeam = React.useCallback(async (id: string): Promise<Team | undefined> => {
    if (!db) {
      return;
    }
    const value = await db.table('teams').get(id) as Team;
    if (!value) {
      return;
    }
    const timestamp = value.timestamp;
    if (!timestamp) {
      return;
    }
    if (timestamp + (3600 * 1000) < Date.now()) {
      return;
    }
    return value;
  }, [ db ]);

  const putTeam = React.useCallback(async (value: Team): Promise<void> => {
    if (!db) {
      return;
    }
    await db.table('teams').put({
      ...value,
      timestamp: Date.now()
    });
  }, [ db ]);

  React.useEffect(() => {
    if (!client) {
      return;
    }
    if (!setError) {
      return;
    }
    (async () => {
      try {
        let team = await getTeam(id);
        const requestContent = new BatchRequestContent();
        if (!team) {
          requestContent.addRequest({
            id: '1',
            request: new Request(
              `/teams/${id}`,
              {
                method: 'GET'
              })
          });
        }
        if (!team?.icon) {
          requestContent.addRequest({
            id: '2',
            request: new Request(
              `/teams/${id}/photo/$value`,
              {
                method: 'GET'
              })
          });
        }
        if (!team?.channels) {
          requestContent.addRequest({
            id: '3',
            request: new Request(
              `/teams/${id}/channels`,
              {
                method: 'GET'
              })
          });
        }
        if (!team?.members) {
          requestContent.addRequest({
            id: '4',
            request: new Request(
              `/teams/${id}/members`,
              {
                method: 'GET'
              })
          });
        }
        if (!team?.drive) {
          requestContent.addRequest({
            id: '5',
            request: new Request(
              `/groups/${id}/drive`,
              {
                method: 'GET'
              })
          });
        }
        if (requestContent.requests.size > 0) {
          const requestBody = await requestContent.getContent();
          const responseBody = await client.api('/$batch').post(requestBody);
          const responseContent = new BatchResponseContent(responseBody);
          for (const [ key, item ] of Array.from(responseContent.getResponses())) {
            if (key === '1') {
              if (item.ok) {
                const json = await item.json();
                const body = json as microsoftClient.Team;
                team = {
                  ...team,
                  id: id,
                  internalId: body.internalId ?? undefined,
                  name: body.displayName ?? undefined,
                  description: body.description ?? undefined,
                  visibility: body.visibility ?? undefined,
                  url: body.webUrl ?? undefined
                };
              }
            }
            if (key === '2') {
              if (item.ok) {
                const text = await item.text();
                const bytes = Buffer.from(text, 'base64').toString();
                const array = new Uint8Array(bytes.length);
                for (let index = 0; index < bytes.length; index++) {
                  array[index] = bytes.charCodeAt(index);
                }
                const blob = new Blob([ array ]);
                team = {
                  ...team,
                  id: id,
                  icon: {
                    url: window.URL.createObjectURL(blob)
                  }
                };
              } else if (item.status === 404) {
                team = {
                  ...team,
                  id: id,
                  icon: {
                    url: undefined
                  }
                };
              }
            }
            if (key === '3') {
              if (item.ok) {
                const json = await item.json();
                const body = json.value as microsoftClient.Channel[];
                team = {
                  ...team,
                  id: id,
                  channels: {
                    count: json['@odata.count'],
                    nextLink: json['@odata.nextLink'],
                    values: body.map((value) => ({
                      id: value.id ?? undefined,
                      name: value.displayName ?? undefined,
                      url: value.webUrl ?? undefined
                    }))
                  }
                };
              }
            }
            if (key === '4') {
              if (item.ok) {
                const json = await item.json();
                const body = json.value as microsoftClient.AadUserConversationMember[];
                team = {
                  ...team,
                  id: id,
                  members: {
                    count: json['@odata.count'],
                    nextLink: json['@odata.nextLink'],
                    values: body.map((value) => ({
                      id: value.userId ?? undefined,
                      name: value.displayName ?? undefined,
                      email: value.email ?? undefined
                    }))
                  }
                };
              }
            }
            if (key === '5') {
              if (item.ok) {
                const json = await item.json();
                const body = json as microsoftClient.Drive;
                team = {
                  ...team,
                  id: id,
                  drive: {
                    id: body.id ?? undefined,
                    url: body.webUrl ?? undefined
                  }
                };
              }
            }
          }
        }
        if (team) {
          await putTeam(team);
          setTeam(team);
        }
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : Object.prototype.toString.call(error);
        console.error(message);
        setError(message);
      }
    })();
  }, [
    id,
    client,
    setError,
    getTeam,
    putTeam
  ]);

  return [
    team
  ];

};

export { useTeam };
