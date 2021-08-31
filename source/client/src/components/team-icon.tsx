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
  name?: string,
  icon?: string
}

const TeamIcon = ({ name, icon }: TeamIconProps): React.ReactElement => {

  return (
    <Avatar
      image={icon}
      name={name}
      size="larger" />
  );

};

export default TeamIcon;
