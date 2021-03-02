import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Button,
  Card,
  Flex,
  Text
} from '@fluentui/react-northstar';
import TokenContext from '../contexts/TokenContext';
import useTeam from '../hooks/useTeam';
import TeamIcon from './TeamIcon';
import TeamMember from './TeamMember';
import TeamChannel from './TeamChannel';
import TeamDrive from './TeamDrive';

interface TeamItemProps {
  id?: string;
  name?: string;
  description?: string;
}

const TeamItem: React.FC<TeamItemProps> = (props: TeamItemProps) => {

  const {
    id,
    name,
    description
  } = props;
  const [ team ] = useTeam({
    token: React.useContext(TokenContext),
    id: id
  });

  return (
    <Card fluid>
      <Flex gap="gap.medium">
        <TeamIcon
          id={id}
          name={name} />
        <Flex
          column
          gap="gap.smaller">
          <Button
            className="item-text-button"
            content={name}
            text
            onClick={() => {
              if (!team?.url) {
                return;
              }
              microsoftTeams.executeDeepLink(team.url);
            }} />
          <Text
            content={description}
            size="small"
            truncated />
          <Flex
            gap="gap.smaller"
            inline>
            <TeamMember id={id} />
            <TeamChannel id={id} />
            <TeamDrive id={id} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );

};

export default TeamItem;
