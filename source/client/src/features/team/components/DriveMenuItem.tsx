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

import { app } from '@microsoft/teams-js';

import { useSnackbar } from '../../../providers/SnackbarProvider';
import { SnackbarType } from '../../../types/Snackbar';
import { Item } from '../../../types/Store';
import { getDrive } from '../managers/TeamManager';
import messages from '../messages';

import Presenter from './DriveMenuItem.presenter';

interface DriveMenuItemProps {
  item?: Item
}

function DriveMenuItem(props: Readonly<DriveMenuItemProps>) {

  const { item } = props;

  const { setSnackbar } = useSnackbar();
  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getDrive(teamId));
  const intl = useIntl();

  const handleClick = React.useCallback(async () => {
    if (!item?.id) {
      return;
    }
    const value = await fetch(item.id);
    if (value?.webUrl) {
      app.openLink(value.webUrl);
      return;
    }
    setSnackbar({
      text: intl.formatMessage(messages.OpenLinkError),
      type: SnackbarType.warning
    });
  }, [
    intl,
    item?.id,
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
    <Presenter onClick={handleClick} />
  );

}

export default DriveMenuItem;
