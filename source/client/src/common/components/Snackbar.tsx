//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useSnackbar } from '../providers/SnackbarProvider';

import Presenter from './Snackbar.presenter';

function Snackbar() {

  const { snackbar, setSnackbar } = useSnackbar();

  const handleDismiss = React.useCallback(() => {
    setSnackbar(undefined);
  }, [ setSnackbar ]);

  return (
    <Presenter
      intent={snackbar?.intent}
      text={snackbar?.text}
      onDismiss={handleDismiss} />
  );

}

export default Snackbar;
