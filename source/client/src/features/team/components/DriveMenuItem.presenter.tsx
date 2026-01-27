//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Folder16Regular } from '@fluentui/react-icons';
import { useIntl } from 'react-intl';
import { EventHandler } from '../../../types/Event';
import messages from '../messages';
import CardMenuItem from './CardMenuItem';

interface DriveMenuItemProps {
  onClick?: EventHandler
}

function DriveMenuItem(props: Readonly<DriveMenuItemProps>) {

  const { onClick } = props;

  const intl = useIntl();

  return (
    <CardMenuItem
      title={intl.formatMessage(messages.OpenInSharePoint)}
      icon={(
        <Folder16Regular />
      )}
      onClick={onClick} />
  );

}

export default React.memo(DriveMenuItem);
