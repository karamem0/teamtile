//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Fluent UI
import { Avatar } from '@fluentui/react-northstar';
// Hooks
import { useBlobUrl } from '../hooks/use-blob-url';

export interface MemberIconProps {
  icon?: string,
  name?: string
}

export const MemberIcon = ({ icon, name }: MemberIconProps): React.ReactElement | null => {

  const [ url ] = useBlobUrl(icon);

  return (
    <Avatar
      image={url}
      name={name}
      size="small" />
  );

};
