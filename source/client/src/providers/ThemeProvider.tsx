//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Provider, themeNames } from '@fluentui/react-teams';

import { app } from '@microsoft/teams-js';

import { inTeams } from '../utils/Teams';

interface ThemeProviderProps {
  children?: React.ReactNode
}

function ThemeProvider(props: ThemeProviderProps) {

  const { children } = props;

  const [ lang, setLang ] = React.useState<string>('en-US');
  const [ themeName, setThemeName ] = React.useState<themeNames>(themeNames.Default);

  const handleThemeChange = (value: string) => {
    switch (value) {
      case 'dark':
        setThemeName(themeNames.Dark);
        break;
      case 'contrast':
        setThemeName(themeNames.HighContrast);
        break;
      default:
        setThemeName(themeNames.Default);
        break;
    }
  };

  React.useEffect(() => {
    if (!inTeams()) {
      return;
    }
    (async () => {
      await app.initialize();
      const context = await app.getContext();
      setLang(context.app.locale);
      handleThemeChange(context.app.theme);
      app.registerOnThemeChangeHandler(handleThemeChange);
    })();
  }, []);

  return (
    <Provider
      lang={lang}
      themeName={themeName}>
      {children}
    </Provider>
  );

}

export default ThemeProvider;
