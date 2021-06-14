//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { BatchRequestContent, BatchResponseContent } from '@microsoft/microsoft-graph-client';
import * as microsoftclient from '@microsoft/microsoft-graph-types';
import {
  Team,
  TeamChannels,
  TeamDrive,
  TeamMembers
} from '../types';
import AppContext from '../contexts/AppContext';

interface TeamProps {
  team?: Team;
}

const useTeam = (props: TeamProps): [
  Team | undefined,
  TeamChannels | undefined,
  TeamMembers | undefined,
  TeamDrive | undefined
] => {

  const [ client, , , setError ] = React.useContext(AppContext);
  const [ team, setTeam ] = React.useState<Team | undefined>(props.team);
  const [ channels, setChannels ] = React.useState<TeamChannels>();
  const [ members, setMembers ] = React.useState<TeamMembers>();
  const [ drive, setDrive ] = React.useState<TeamDrive>();

  React.useEffect(() => {
    if (!client) {
      return;
    }
    if (!setError) {
      return;
    }
    if (!team?.id) {
      return;
    }
    (async () => {
      try {
        const requestContent = new BatchRequestContent([
          {
            id: '1',
            request: new Request(
              `/teams/${team.id}`,
              {
                method: 'GET'
              })
          },
          {
            id: '2',
            request: new Request(
              `/teams/${team.id}/photo/$value`,
              {
                method: 'GET'
              })
          },
          {
            id: '3',
            request: new Request(
              `/teams/${team.id}/channels`,
              {
                method: 'GET'
              })
          },
          {
            id: '4',
            request: new Request(
              `/teams/${team.id}/members`,
              {
                method: 'GET'
              })
          },
          {
            id: '5',
            request: new Request(
              `/groups/${team.id}/drive`,
              {
                method: 'GET'
              })
          }
        ]);
        const requestBody = await requestContent.getContent();
        const responseBody = await client.api('/$batch').post(requestBody);
        const responseContent = new BatchResponseContent(responseBody);
        responseContent.getResponses().forEach((item, key) => {
          if (item.ok) {
            if (key === '1') {
              (async () => {
                const json = await item.json();
                const body = json as microsoftclient.Team;
                setTeam((value) => {
                  if (!value) {
                    return value;
                  }
                  return {
                    ...value,
                    id: body.id ?? undefined,
                    internalId: body.internalId ?? undefined,
                    name: body.displayName ?? undefined,
                    description: body.description ?? undefined,
                    visibility: body.visibility ?? undefined,
                    url: body.webUrl ?? undefined
                  } as Team;
                });
              })();
            }
            if (key === '2') {
              (async () => {
                const text = await item.text();
                const bytes = atob(text);
                const array = new Uint8Array(bytes.length);
                for (let index = 0; index < bytes.length; index++) {
                  array[index] = bytes.charCodeAt(index);
                }
                const blob = new Blob([ array ]);
                setTeam((value) => {
                  if (!value) {
                    return value;
                  }
                  return {
                    ...value,
                    icon: window.URL.createObjectURL(blob)
                  };
                });
              })();
            }
            if (key === '3') {
              (async () => {
                const json = await item.json();
                const values = json.value as microsoftclient.Channel[];
                setChannels({
                  count: json['@odata.count'],
                  nextLink: json['@odata.nextLink'],
                  values: values.map((value) => ({
                    id: value.id ?? undefined,
                    name: value.displayName ?? undefined,
                    url: value.webUrl ?? undefined
                  }))
                });
              })();
            }
            if (key === '4') {
              (async () => {
                const json = await item.json();
                const values = json.value as microsoftclient.AadUserConversationMember[];
                setMembers({
                  count: json['@odata.count'],
                  nextLink: json['@odata.nextLink'],
                  values: values.map((value) => ({
                    id: value.userId ?? undefined,
                    name: value.displayName ?? undefined,
                    email: value.email ?? undefined
                  }))
                });
              })();
            }
            if (key === '5') {
              (async () => {
                const json = await item.json();
                const body = json as microsoftclient.Drive;
                setDrive({
                  id: body.id ?? undefined,
                  url: body.webUrl ?? undefined
                });
              })();
            }
          }
        });
      } catch (e) {
        console.error(e);
        setError(e.toString());
      }
    })();
  }, [
    client,
    setError,
    team?.id
  ]);

  return [
    team,
    channels,
    members,
    drive
  ];

};

export default useTeam;
