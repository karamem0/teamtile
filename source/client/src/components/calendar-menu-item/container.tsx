//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';

import { Group } from '../../types/entity';
import { ItemKey, ItemValue } from '../../types/state';

import Presenter from './presenter';

interface CalendarMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export default function CalendarMenuItem ({
  itemValue
}: CalendarMenuItemProps): React.ReactElement | null {

  const handleClick = React.useCallback((_, data: Group | undefined) => {
    if (!data?.mail) {
      return;
    }
    const [ name, domain ] = data.mail.split('@');
    app.openLink(`https://outlook.office.com/calendar/group/${domain}/${name}`);
  }, []);

  if (!itemValue.drive) {
    return null;
  }

  return (
    <Presenter
      group={itemValue}
      onClick={handleClick} />
  );

}
