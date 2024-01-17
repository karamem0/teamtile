//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import LoaderPanal from './LoaderPanel';

interface AppLoaderProps {
  children?: React.ReactNode,
  loading?: boolean
}

function AppLoader(props: Readonly<AppLoaderProps>) {

  const {
    children,
    loading
  } = props;

  return loading ? (
    <LoaderPanal />
  ) : (
    <React.Fragment>
      {children}
    </React.Fragment>
  );

}

export default AppLoader;
