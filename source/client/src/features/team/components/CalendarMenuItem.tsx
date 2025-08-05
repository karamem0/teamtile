//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app, appInstallDialog } from '@microsoft/teams-js';
import { useAsyncFn, useError } from 'react-use';
import { getTab } from '../managers/TeamManager';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useSnackbar } from '../../../common/providers/SnackbarProvider';

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

  const { setSnackbar } = useSnackbar();
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
    setSnackbar({
      intent: 'warning',
      text: intl.formatMessage(messages.OperationNotSupported)
    });
  }, [
    id,
    internalId,
    intl,
    fetch,
    setSnackbar
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
