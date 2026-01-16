//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import CardMenuItem from './CardMenuItem';
import { EventHandler } from '../../../types/Event';
import { People16Regular } from '@fluentui/react-icons';
import messages from '../messages';
import { useIntl } from 'react-intl';

interface MemberMenuItemProps {
  onClick?: EventHandler
}

function MemberMenuItem(props: Readonly<MemberMenuItemProps>) {

  const { onClick } = props;

  const intl = useIntl();

  return (
    <React.Fragment>
      <CardMenuItem
        title={intl.formatMessage(messages.ViewMembers)}
        icon={(
          <People16Regular />
        )}
        onClick={onClick} />
      {/*  */}
    </React.Fragment>
  );

}

export default React.memo(MemberMenuItem);
