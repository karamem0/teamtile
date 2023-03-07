//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
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

import Presenter from './CalendarMenuItem.presenter';

interface CalendarMenuItemProps {
  item?: Item
}

function CalendarMenuItem(props: CalendarMenuItemProps) {

  const { item } = props;

  const { setSnackbar } = useSnackbar();
  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string, channelId: string, appId: string) => getTab(teamId, channelId, appId));

  React.useEffect(() => {
    if (!state.error) {
      return;
    }
    dispatchError(state.error);
  }, [
    dispatchError,
    state.error
  ]);

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
        return await app.openLink(appTab.webUrl);
      } else if (appInstallDialog.isSupported()) {
        return await appInstallDialog.openAppInstallDialog({ appId });
      }
    }
    setSnackbar({
      text: 'This operation is not supported on this device.',
      type: SnackbarType.warning
    });
  }, [
    fetch,
    item,
    setSnackbar
  ]);

  return (
    <Presenter
      loading={state.loading}
      onClick={handleClick} />
  );

}

export default CalendarMenuItem;
