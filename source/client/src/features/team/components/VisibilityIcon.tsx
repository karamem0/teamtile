//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './VisibilityIcon.presenter';
import { VisibilityType } from '../../../types/Entity';

interface VisibilityIconProps {
  type?: VisibilityType
}

function VisibilityIcon(props: Readonly<VisibilityIconProps>) {

  const { type } = props;

  return (
    <Presenter type={type} />
  );

}

export default VisibilityIcon;
