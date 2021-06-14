//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

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
