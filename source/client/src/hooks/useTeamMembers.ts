import React from 'react';
import * as microsoftGraph from '@microsoft/microsoft-graph-types';

interface TeamMembersProps {
  token?: string;
  id?: string;
}

interface TeamMemberResult {
  id?: string;
  name?: string;
  email?: string;
}

const useTeamMembers = (props: TeamMembersProps): [TeamMemberResult[] | undefined] => {

  const { token, id } = props;
  const [ members, setMembers ] = React.useState<TeamMemberResult[]>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    if (!id) {
      return;
    }
    (async () => {
      const response = await fetch(
        `https://graph.microsoft.com/beta/teams/${id}/members`,
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
        const values = json.value as microsoftGraph.AadUserConversationMember[];
        setMembers(values.map(value => (
          {
            id: value.userId ?? undefined,
            name: value.displayName ?? undefined,
            email: value.email ?? undefined
          })));
      }
    })();
  }, [ token ]);

  return [ members ];

};

export default useTeamMembers;
