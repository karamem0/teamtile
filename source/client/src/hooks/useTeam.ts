import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';
import {
  MicrosoftGraphArrayResponse,
  MicrosoftGraphBatchResponse,
  MicrosoftGraphErrorResponse
} from '../types/microsoft-graph';
import {
  Team,
  TeamChannels,
  TeamDrive,
  TeamMembers
} from '../types';

interface TeamProps {
  token?: string;
  team?: Team;
}

const useTeam = (props: TeamProps): [
  Team | undefined,
  TeamChannels | undefined,
  TeamMembers | undefined,
  TeamDrive | undefined,
  string | undefined
] => {

  const { token } = props;
  const [ team, setTeam ] = React.useState<Team | undefined>(props.team);
  const [ channels, setChannels ] = React.useState<TeamChannels>();
  const [ members, setMembers ] = React.useState<TeamMembers>();
  const [ drive, setDrive ] = React.useState<TeamDrive>();
  const [ error, setError ] = React.useState<string>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    if (!team?.id) {
      return;
    }
    (async () => {
      try {
        const response = await fetch(
          'https://graph.microsoft.com/v1.0/$batch',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              requests: [
                {
                  id: '1',
                  method: 'GET',
                  url: `/teams/${team.id}`
                },
                {
                  id: '2',
                  method: 'GET',
                  Url: `/teams/${team.id}/photo/$value`
                },
                {
                  id: '3',
                  method: 'GET',
                  url: `/teams/${team.id}/channels`
                },
                {
                  id: '4',
                  method: 'GET',
                  url: `/teams/${team.id}/members`
                },
                {
                  id: '5',
                  method: 'GET',
                  url: `/groups/${team.id}/drive`
                }
              ]
            })
          }
        );
        if (response.ok) {
          const json = await response.json();
          const responses = json.responses as MicrosoftGraphBatchResponse[];
          responses.forEach((batch) => {
            if (batch.status >= 200 && batch.status <= 299) {
              if (batch.id === '1') {
                setTeam((value) => {
                  if (!value) {
                    return value;
                  }
                  const body = batch.body as microsoftGraph.Team;
                  return {
                    ...value,
                    id: body.id ?? undefined,
                    internalId: body.internalId ?? undefined,
                    name: body.displayName ?? undefined,
                    description: body.description ?? undefined,
                    visibility: body.visibility ?? undefined,
                    url: body.webUrl ?? undefined
                  };
                });
              }
              if (batch.id === '2') {
                setTeam((value) => {
                  if (!value) {
                    return value;
                  }
                  const binary = atob(batch.body as string);
                  const bytes = new Uint8Array(binary.length);
                  for (let index = 0; index < binary.length; index++) {
                    bytes[index] = binary.charCodeAt(index);
                  }
                  const blob = new Blob([ bytes ], { type: batch.headers['Content-Type'] });
                  return {
                    ...value,
                    icon: window.URL.createObjectURL(blob)
                  };
                });
              }
              if (batch.id === '3') {
                const body = batch.body as MicrosoftGraphArrayResponse;
                const values = body.value as microsoftGraph.Channel[];
                setChannels({
                  count: body['@odata.count'],
                  nextLink: body['@odata.nextLink'],
                  values: values.map((value) => ({
                    id: value.id ?? undefined,
                    name: value.displayName ?? undefined,
                    url: value.webUrl ?? undefined
                  }))
                });
              }
              if (batch.id === '4') {
                const body = batch.body as MicrosoftGraphArrayResponse;
                const values = body.value as microsoftGraph.AadUserConversationMember[];
                setMembers({
                  count: body['@odata.count'],
                  nextLink: body['@odata.nextLink'],
                  values: values.map((value) => ({
                    id: value.userId ?? undefined,
                    name: value.displayName ?? undefined,
                    email: value.email ?? undefined
                  }))
                });
              }
              if (batch.id === '5') {
                const body = batch.body as microsoftGraph.Drive;
                setDrive({
                  id: body.id ?? undefined,
                  url: body.webUrl ?? undefined
                });
              }
            } else {
              if (batch.status !== 429) {
                const body = batch.body as MicrosoftGraphErrorResponse;
                const message = body.error.message ?? undefined;
                throw new Error(message);
              }
            }
          });
        } else {
          const json = await response.json();
          const value = json.error as microsoftGraph.GenericError;
          const message = value.message ?? undefined;
          throw new Error(message);
        }
      } catch (e) {
        setError(e.toString());
      }
    })();
  }, [
    token,
    team?.id
  ]);

  return [
    team,
    channels,
    members,
    drive,
    error
  ];

};

export default useTeam;
