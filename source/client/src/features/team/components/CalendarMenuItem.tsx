//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app, appInstallDialog } from '@microsoft/teams-js';
import { useIntl } from 'react-intl';
import { useAsyncFn, useError } from 'react-use';
import { useToast } from '../../../common/providers/ToastProvider';
import { getTab } from '../managers/TeamManager';
import messages from '../messages';

import Presenter from './CalendarMenuItem.presenter';

interface CalendarMenuItemProps {
  id?: string,
  internalId?: string
}

function CalendarMenuItem(props: Readonly<CalendarMenuItemProps>) {

  const {
    id,
    internalId
  } = props;

  const dispatchToast = useToast();
  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string, channelId: string, appId: string) => getTab(teamId, channelId, appId));
  const intl = useIntl();

  const handleClick = React.useCallback(async () => {
    if (id == null) {
      return;
    }
    if (internalId == null) {
      return;
    }
    const appId = import.meta.env.VITE_CALENDAR_APP_ID;
    const appTab = await fetch(id, internalId, appId);
    if (appTab?.webUrl) {
      await app.openLink(appTab.webUrl);
      return;
    }
    if (appInstallDialog.isSupported()) {
      await appInstallDialog.openAppInstallDialog({ appId });
      return;
    }
    dispatchToast(intl.formatMessage(messages.OperationNotSupported), 'warning');
  }, [
    id,
    internalId,
    intl,
    dispatchToast,
    fetch
  ]);

  React.useEffect(() => {
    if (state.error == null) {
      return;
    }
    dispatchError(state.error);
  }, [
    state.error,
    dispatchError
  ]);

  return (
    <Presenter onClick={handleClick} />
  );

}

export default CalendarMenuItem;
