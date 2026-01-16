//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import LoaderPanal from './LoaderPanel';

interface TeamsAuthenticatorProps {
  loading?: boolean
}

function TeamsAuthenticator(props: Readonly<React.PropsWithChildren<TeamsAuthenticatorProps>>) {

  const {
    children,
    loading
  } = props;

  return loading ? (
    <LoaderPanal />
  ) : children;

}

export default React.memo(TeamsAuthenticator);
