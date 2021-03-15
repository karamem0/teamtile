import React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import AppContext from '../contexts/AppContext';
import useTeamIcon from '../hooks/useTeamIcon';

interface TeamIconProps {
  id?: string;
  name?: string;
}

const TeamIcon: React.FC<TeamIconProps> = (props: TeamIconProps) => {

  const { id, name } = props;
  const [ token ] = React.useContext(AppContext);
  const [ icon ] = useTeamIcon({ token, id });

  return (
    <Avatar
      image={icon}
      name={name}
      size="larger" />
  );

};

export default TeamIcon;
