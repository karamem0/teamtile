//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './VisibilityIcon.presenter';
import { VisibilityType } from '../../../types/Entity';

interface VisibilityIconProps {
  value?: VisibilityType
}

function VisibilityIcon(props: Readonly<VisibilityIconProps>) {

  const { value } = props;

  return (
    <Presenter value={value} />
  );

}

export default VisibilityIcon;
