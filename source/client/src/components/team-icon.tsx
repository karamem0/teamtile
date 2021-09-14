//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { useBlobUrl } from '../hooks/use-blob-url';

interface TeamIconProps {
  name?: string,
  data?: string
}

const TeamIcon = ({ name, data }: TeamIconProps): React.ReactElement => {

  const [ url ] = useBlobUrl(data);

  return (
    <Avatar
      image={url}
      name={name}
      size="larger" />
  );

};

export default TeamIcon;
