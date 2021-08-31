//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { useUserIcon } from '../hooks/use-user-icon';

interface UserIconProps {
  id?: string,
  name?: string
}

const UserIcon = ({ id, name }: UserIconProps): React.ReactElement => {

  const [ icon ] = useUserIcon({ id });

  return (
    <Avatar
      image={icon}
      name={name}
      size="small" />
  );

};

export default UserIcon;
