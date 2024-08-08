//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';
import { useAsyncFn, useError } from 'react-use';

import {
  app,
  appInstallDialog
} from '@microsoft/teams-js';

import { useSnackbar } from '../../../providers/SnackbarProvider';
import { SnackbarType } from '../../../types/Snackbar';
import { Item } from '../../../types/Store';
import { isPC } from '../../../utils/Teams';
import { getTab } from '../managers/TeamManager';
import messages from '../messages';

import Presenter from './CalendarMenuItem.presenter';

interface CalendarMenuItemProps {
  item?: Item
}

function CalendarMenuItem(props: Readonly<CalendarMenuItemProps>) {

  const { item } = props;

  const { setSnackbar } = useSnackbar();
  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string, channelId: string, appId: string) => getTab(teamId, channelId, appId));
  const intl = useIntl();

  const handleClick = React.useCallback(async () => {
    if (!item?.value?.id) {
      return;
    }
    if (!item?.value?.internalId) {
      return;
    }
    if (isPC(await app.getContext())) {
      const appId = process.env.VITE_CALENDAR_APP_ID;
      const appTab = await fetch(item.value.id, item.value.internalId, appId);
      if (appTab?.webUrl) {
        await app.openLink(appTab.webUrl);
        return;
      }
      if (appInstallDialog.isSupported()) {
        await appInstallDialog.openAppInstallDialog({ appId });
        return;
      }
    }
    setSnackbar({
      text: intl.formatMessage(messages.OperationNotSupported),
      type: SnackbarType.warning
    });
  }, [
    intl,
    item,
    fetch,
    setSnackbar
  ]);

  React.useEffect(() => {
    if (!state.error) {
      return;
    }
    dispatchError(state.error);
  }, [
    dispatchError,
    state.error
  ]);

  return (
    <Presenter
      loading={state.loading}
      onClick={handleClick} />
  );

}

export default CalendarMenuItem;
