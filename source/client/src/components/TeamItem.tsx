import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Button,
  Card,
  Flex,
  FlexItem,
  Text
} from '@fluentui/react-northstar';
import { LockIcon, GlobeIcon } from '@fluentui/react-icons';
import { Team } from '../types';
import AppContext from '../contexts/AppContext';
import useTeam from '../hooks/useTeam';
import TeamIcon from './TeamIcon';
import TeamItemMenu from './TeamItemMenu';

interface TeamItemProps {
  team?: Team;
}

const TeamItem: React.FC<TeamItemProps> = (props: TeamItemProps) => {

  const [ token, , , setError ] = React.useContext(AppContext);
  const [ team, error ] = useTeam({ token, team: props.team });

  React.useEffect(() => {
    if (!setError) {
      return;
    }
    setError(error);
  }, [ setError, error ]);

  return (
    <React.Fragment>
      {
        team &&
          <Card fluid>
            <Flex gap="gap.medium">
              <TeamIcon
                id={team.id}
                name={team.name} />
              <FlexItem>
                <Flex
                  column
                  gap="gap.smaller">
                  <Button
                    className="grid-item-text-button"
                    content={team.name}
                    text
                    onClick={() => {
                      if (!team.url) {
                        return;
                      }
                      microsoftTeams.executeDeepLink(team.url);
                    }} />
                  <Text
                    content={team.description}
                    size="small"
                    truncated />
                  <TeamItemMenu team={team} />
                </Flex>
              </FlexItem>
              <FlexItem push>
                <Flex>
                  <Text color="brand">
                    {
                      team.visibility === 'public' &&
                        <GlobeIcon className="grid-item-icon" />
                    }
                    {
                      team.visibility === 'private' &&
                        <LockIcon className="grid-item-icon" />
                    }
                  </Text>
                </Flex>
              </FlexItem>
            </Flex>
          </Card>
      }
    </React.Fragment>
  );

};

export default TeamItem;
