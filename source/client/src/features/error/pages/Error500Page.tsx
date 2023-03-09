//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './Error500Page.presenter';

interface Error500PageProps {
  error?: Error
}

function Error500Page(props: Error500PageProps) {

  const { error } = props;

  return (
    <Presenter error={error?.message} />
  );

}

export default Error500Page;
