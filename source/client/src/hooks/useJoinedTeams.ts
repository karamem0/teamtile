import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';

interface JoinedTeamsProps {
  token?: string;
}

interface JoinedTeamsResult {
  id?: string;
  name?: string;
  description?: string;
}

const useJoinedTeams = (props: JoinedTeamsProps): [JoinedTeamsResult[] | undefined] => {

  const { token } = props;
  const [ teams, setTeams ] = React.useState<JoinedTeamsResult[]>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      const response = await fetch(
        'https://graph.microsoft.com/beta/me/joinedTeams',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'GET',
          mode: 'cors'
        }
      );
      if (response.ok) {
        const json = await response.json();
        const values = json.value as microsoftGraph.Team[];
        setTeams(values.map(value => ({
          id: value.id ?? undefined,
          name: value.displayName ?? undefined,
          description: value.description ?? undefined
        })));
      }
    })();
  }, [ token ]);

  return [ teams ];

};

export default useJoinedTeams;
