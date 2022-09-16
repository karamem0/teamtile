//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { VisibilityType } from '../../../types/Entity';

import Presenter from './VisibilityIcon.presenter';

interface VisibilityIconProps {
  value?: VisibilityType
}

function VisibilityIcon(props: VisibilityIconProps) {

  const { value } = props;

  return (
    <Presenter value={value} />
  );

}

export default VisibilityIcon;
