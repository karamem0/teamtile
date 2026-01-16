//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useAsyncFn, useError } from 'react-use';
import { app } from '@microsoft/teams-js';
import { getDrive } from '../managers/TeamManager';
import messages from '../messages';
import { useIntl } from 'react-intl';
import { useSnackbar } from '../../../common/providers/SnackbarProvider';

import Presenter from './DriveMenuItem.presenter';

interface DriveMenuItemProps {
  id?: string
}

function DriveMenuItem(props: Readonly<DriveMenuItemProps>) {

  const { id } = props;

  const { setSnackbar } = useSnackbar();
  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string) => getDrive(teamId));
  const intl = useIntl();

  const handleClick = React.useCallback(async () => {
    if (id == null) {
      return;
    }
    const value = await fetch(id);
    if (value?.webUrl) {
      app.openLink(value.webUrl);
      return;
    }
    setSnackbar({
      intent: 'warning',
      text: intl.formatMessage(messages.OpenLinkError)
    });
  }, [
    id,
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

export default DriveMenuItem;
