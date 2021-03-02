import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Avatar } from '@fluentui/react-northstar';
import TokenContext from '../contexts/TokenContext';
import useUserIcon from '../hooks/useUserIcon';

interface TeamMemberIconProps {
  id?: string;
  name?: string;
  email?: string;
}

const TeamMemberIcon: React.FC<TeamMemberIconProps> = (props: TeamMemberIconProps) => {

  const { id, name, email } = props;
  const [ icon ] = useUserIcon({
    token: React.useContext(TokenContext),
    id: id
  });

  return (
    <Avatar
      className="popup-icon"
      image={icon}
      name={name}
      size="small"
      onClick={() => {
        if (!email) {
          return;
        }
        microsoftTeams.executeDeepLink(`https://teams.microsoft.com/l/chat/0/0?users=${email}`);
      }} />
  );

};

export default TeamMemberIcon;
