import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Avatar } from '@fluentui/react-northstar';

interface TeamChannelIconProps {
  id?: string;
  name?: string;
  url?: string;
}

const TeamChannelIcon: React.FC<TeamChannelIconProps> = (props: TeamChannelIconProps) => {

  const { name, url } = props;

  return (
    <Avatar
      className="popup-icon"
      name={name}
      size="small"
      onClick={() => {
        if (!url) {
          return;
        }
        microsoftTeams.executeDeepLink(url);
      }} />
  );

};

export default TeamChannelIcon;
