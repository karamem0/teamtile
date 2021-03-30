import React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import AppContext from '../contexts/AppContext';
import useUserIcon from '../hooks/useUserIcon';

interface UserIconProps {
  id?: string;
  name?: string;
}

const UserIcon: React.FC<UserIconProps> = (props: UserIconProps) => {

  const { id, name } = props;
  const [ token ] = React.useContext(AppContext);
  const [ icon ] = useUserIcon({ token, id });

  return (
    <Avatar
      image={icon}
      name={name}
      size="small" />
  );

};

export default UserIcon;
