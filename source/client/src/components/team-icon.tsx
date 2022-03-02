//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Avatar } from '@fluentui/react-northstar';

import { useBlobUrl } from '../hooks/use-blob-url';

export interface TeamIconProps {
  icon: string | null | undefined,
  name: string | null | undefined
}

export const TeamIcon = ({ icon, name }: TeamIconProps): React.ReactElement | null => {

  const { url } = useBlobUrl(icon);

  return (
    <Avatar
      image={url}
      name={name || undefined}
      size="larger" />
  );

};
