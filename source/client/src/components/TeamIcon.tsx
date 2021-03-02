import React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import TokenContext from '../contexts/TokenContext';
import useTeamIcon from '../hooks/useTeamIcon';

interface TeamIconProps {
  id?: string;
  name?: string;
}

const TeamIcon: React.FC<TeamIconProps> = (props: TeamIconProps) => {

  const { id, name } = props;
  const [ icon ] = useTeamIcon({
    token: React.useContext(TokenContext),
    id: id
  });

  return (
    <Avatar
      image={icon}
      name={name}
      size="larger" />
  );

};

export default TeamIcon;
