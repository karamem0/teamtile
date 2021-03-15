import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Button,
  Flex,
  Text
} from '@fluentui/react-northstar';
import { SharepointLogoIcon } from '@fluentui/react-icons';
import AppContext from '../contexts/AppContext';
import useGroupDrive from '../hooks/useGroupDrive';

interface TeamDriveProps {
  id?: string;
}

const TeamDrive: React.FC<TeamDriveProps> = (props: TeamDriveProps) => {

  const { id } = props;
  const [ token ] = React.useContext(AppContext);
  const [ drive ] = useGroupDrive({ token, id });

  return (
    <Button
      className="item-text-button"
      text
      onClick={() => {
        if (!drive?.url) {
          return;
        }
        microsoftTeams.executeDeepLink(drive.url);
      }}>
      <Flex
        gap="gap.smaller"
        inline
        vAlign="start">
        <Text color="brand">
          <SharepointLogoIcon className="item-icon" />
        </Text>
      </Flex>
    </Button>
  );

};

export default TeamDrive;
