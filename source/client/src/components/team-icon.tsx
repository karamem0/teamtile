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

export interface TeamIconProps {
  icon?: string,
  name?: string
}

export const TeamIcon = ({ name, icon }: TeamIconProps): React.ReactElement | null => {

  const [ image ] = useBlobUrl(icon);

  return (
    <Avatar
      image={image}
      name={name}
      size="larger" />
  );

};
