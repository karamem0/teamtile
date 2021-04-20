import React from 'react';
import { Avatar } from '@fluentui/react-northstar';

interface TeamIconProps {
  name?: string;
  icon?: string;
}

const TeamIcon: React.FC<TeamIconProps> = (props: TeamIconProps) => {

  const {
    name,
    icon
  } = props;

  return (
    <Avatar
      image={icon}
      name={name}
      size="larger" />
  );

};

export default TeamIcon;
