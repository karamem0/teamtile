import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';
import { MicrosoftGraphArrayResponse, MicrosoftGraphErrorResponse } from '../types/microsoft-graph';
import { Team } from '../types';

interface TeamsProps {
  token?: string;
}

const useTeams = (props: TeamsProps): [ Team[] | undefined, string | undefined ] => {

  const { token } = props;
  const [ teams, setTeams ] = React.useState<Team[]>();
  const [ error, setError ] = React.useState<string>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      try {
        const response = await fetch(
          'https://graph.microsoft.com/beta/me/memberOf/microsoft.graph.group' +
          '?$count=true' +
          '&$filter=resourceProvisioningOptions/any(x:x eq \'Team\')' +
          '&$orderby=displayName',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              ConsistencyLevel: 'eventual'
            },
            method: 'GET',
            mode: 'cors'
          }
        );
        if (response.ok) {
          const json = await response.json() as MicrosoftGraphArrayResponse;
          const values = json.value as microsoftGraph.Group[];
          setTeams(values.map(value => ({
            id: value.id ?? undefined,
            name: value.displayName ?? undefined,
            description: value.description ?? undefined
          })));
        } else {
          const json = await response.json() as MicrosoftGraphErrorResponse;
          const value = json.error as microsoftGraph.GenericError;
          const message = value.message ?? undefined;
          throw new Error(message);
        }
      } catch (e) {
        setTeams([]);
        setError(e.toString());
      }
    })();
  }, [ token ]);

  return [
    teams,
    error
  ];

};

export default useTeams;
