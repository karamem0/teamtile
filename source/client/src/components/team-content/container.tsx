//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useReducerContext } from '../../contexts/reducer-context';

import Presenter from './presenter';

export default function TeamContent (): React.ReactElement | null {

  const { state: { items } } = useReducerContext();

  return (
    <Presenter items={items} />
  );

}
