//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './ErrorPage.presenter';

interface ErrorPageProps {
  error?: Error
}

function ErrorPage(props: ErrorPageProps) {

  const { error } = props;

  return (
    <Presenter error={error?.message} />
  );

}

export default ErrorPage;
