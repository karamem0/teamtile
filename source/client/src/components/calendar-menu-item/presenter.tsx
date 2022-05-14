//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { CalendarIcon } from '@fluentui/react-icons-mdl2';

import { EventHandler } from '../../types/common';
import { Group } from '../../types/entity';
import { CardMenuItem } from '../card-menu-item';

interface CalendarMenuItemProps {
  group: Group,
  onClick?: EventHandler<Group> | undefined
}

export default React.memo(function CalendarMenuItem ({
  group,
  onClick
}: CalendarMenuItemProps): React.ReactElement | null {

  return (
    <CardMenuItem
      content={undefined}
      icon={<CalendarIcon />}
      onClick={(event) => onClick && onClick(event, group)} />
  );

});
