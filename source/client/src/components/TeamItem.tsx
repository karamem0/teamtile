import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Button,
  Card,
  Flex,
  FlexItem,
  Text
} from '@fluentui/react-northstar';
import { LockIcon } from '@fluentui/react-icons-northstar';
import AppContext from '../contexts/AppContext';
import useTeam from '../hooks/useTeam';
import TeamIcon from './TeamIcon';
import TeamMemberList from './TeamMemberList';
import TeamChannelList from './TeamChannelList';
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
  const [ token ] = React.useContext(AppContext);
  const [ team ] = useTeam({ token, id });

  return (
    <Card fluid>
      <Flex gap="gap.medium">
        <TeamIcon
          id={id}
          name={name} />
        <FlexItem>
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
              <TeamMemberList id={id} />
              <TeamChannelList id={id} />
              <TeamDrive id={id} />
            </Flex>
          </Flex>
        </FlexItem>
        <FlexItem push>
          <Flex>
            <Text color="brand">
              {
                team?.visibility === 'private'
                  ? <LockIcon
                      outline
                      size="small" />
                  : null
              }
            </Text>
          </Flex>
        </FlexItem>
      </Flex>
    </Card>
  );

};

export default TeamItem;
