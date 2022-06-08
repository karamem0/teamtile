//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Provider, themeNames } from '@fluentui/react-teams';

interface ThemeProviderProps {
  children: React.ReactNode,
  lang: string,
  themeName: themeNames
}

export default React.memo(function ThemeProvider ({
  children,
  lang,
  themeName
}: ThemeProviderProps): React.ReactElement | null {

  return (
    <Provider
      lang={lang}
      themeName={themeName}>
      {children}
    </Provider>
  );

});
