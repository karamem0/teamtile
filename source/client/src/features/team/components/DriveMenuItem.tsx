//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app } from '@microsoft/teams-js';
import { useIntl } from 'react-intl';
import { useAsyncFn, useError } from 'react-use';
import { useToast } from '../../../common/providers/ToastProvider';
import { getDrive } from '../managers/TeamManager';
import messages from '../messages';

import Presenter from './DriveMenuItem.presenter';

interface DriveMenuItemProps {
  id?: string
}

function DriveMenuItem(props: Readonly<DriveMenuItemProps>) {

  const { id } = props;

  const dispatchToast = useToast();
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
    dispatchToast(intl.formatMessage(messages.OpenLinkError), 'warning');
  }, [
    id,
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

export default DriveMenuItem;
