//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import useUserIcon from '../hooks/useUserIcon';

interface UserIconProps {
  id?: string;
  name?: string;
}

const UserIcon: React.FC<UserIconProps> = (props: UserIconProps) => {

  const { id, name } = props;
  const [ icon ] = useUserIcon({ id });

  return (
    <Avatar
      image={icon}
      name={name}
      size="small" />
  );

};

export default UserIcon;
