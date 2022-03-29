//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Provider, ThemePrepared } from '@fluentui/react-northstar';

interface ThemeProviderProps {
  children: React.ReactNode,
  theme: ThemePrepared
}

export default React.memo(function ThemeProvider ({
  children,
  theme
}: ThemeProviderProps): React.ReactElement | null {

  return (
    <Provider theme={theme}>
      {children}
    </Provider>
  );

});
