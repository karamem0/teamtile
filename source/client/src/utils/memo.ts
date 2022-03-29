//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

export function memo<T extends React.ComponentType<any>> (
  component: Parameters<typeof React.memo>[0],
  propsAreEqual?: Parameters<typeof React.memo>[1]
) {
  return (React.memo(component, propsAreEqual) as unknown) as T;
}
