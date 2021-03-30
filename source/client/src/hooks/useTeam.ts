import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';
import {
  MicrosoftGraphArrayResponse,
  MicrosoftGraphBatchResponse,
  MicrosoftGraphErrorResponse
} from '../types/microsoft-graph';
import {
  Team
} from '../types';

interface TeamProps {
  token?: string;
  team?: Team;
}

const useTeam = (props: TeamProps): [Team | undefined, string | undefined] => {

  const { token } = props;
  const [ team, setTeam ] = React.useState<Team | undefined>(props.team);
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
          'https://graph.microsoft.com/beta/$batch',
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
                  url: `/teams/${team.id}/channels`
                },
                {
                  id: '3',
                  method: 'GET',
                  url: `/teams/${team.id}/members`
                },
                {
                  id: '4',
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
          const value = {
            id: team.id,
            name: team?.name,
            description: team?.description
          } as Team;
          responses.forEach((batch) => {
            if (batch.status >= 200 || batch.status <= 299) {
              if (batch.id === '1') {
                const body = batch.body as microsoftGraph.Team;
                value.id = body.id ?? undefined;
                value.internalId = body.internalId ?? undefined;
                value.visibility = body.visibility ?? undefined;
                value.url = body.webUrl ?? undefined;
              }
              if (batch.id === '2') {
                const body = batch.body as MicrosoftGraphArrayResponse;
                const values = body.value as microsoftGraph.Channel[];
                value.channels = {
                  count: body['@odata.count'],
                  hasMore: !!body['@odata.nextLink'],
                  values: values.map((value) => ({
                    id: value.id ?? undefined,
                    name: value.displayName ?? undefined,
                    url: value.webUrl ?? undefined
                  }))
                };
              }
              if (batch.id === '3') {
                const body = batch.body as MicrosoftGraphArrayResponse;
                const values = body.value as microsoftGraph.AadUserConversationMember[];
                value.members = {
                  count: body['@odata.count'],
                  hasMore: !!body['@odata.nextLink'],
                  values: values.map((value) => ({
                    id: value.userId ?? undefined,
                    name: value.displayName ?? undefined,
                    email: value.email ?? undefined
                  }))
                };
              }
              if (batch.id === '4') {
                const body = batch.body as microsoftGraph.Drive;
                value.drive = {
                  id: body.id ?? undefined,
                  url: body.webUrl ?? undefined
                };
              }
            } else {
              const body = batch.body as MicrosoftGraphErrorResponse;
              const message = body.error.message ?? undefined;
              throw new Error(message);
            }
          });
          setTeam(value);
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
    team?.id,
    team?.name,
    team?.description
  ]);

  return [
    team,
    error
  ];

};

export default useTeam;
