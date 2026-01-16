//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { MemberRoleType } from '../../../types/Entity';

import Presenter from './MemberRoleIcon.presenter';

export interface MemberRoleIconProps {
  type?: MemberRoleType
}

function MemberRoleIcon(props: Readonly<MemberRoleIconProps>) {

  const { type } = props;

  return (
    <Presenter type={type} />
  );

}

export default MemberRoleIcon;
