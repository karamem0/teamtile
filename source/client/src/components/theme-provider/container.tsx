//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { themeNames } from '@fluentui/react-teams';

import { app } from '@microsoft/teams-js';

import { useInTeams } from '../../hooks/use-in-teams';

import Presenter from './presenter';

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider ({
  children
}: ThemeProviderProps): React.ReactElement | null {

  const [ lang, setLang ] = React.useState<string>('en-US');
  const [ themeName, setThemeName ] = React.useState<themeNames>(themeNames.Default);
  const { inTeams } = useInTeams();

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
    (async () => {
      if (inTeams) {
        await app.initialize();
        const context = await app.getContext();
        setLang(context.app.locale);
        handleThemeChange(context.app.theme);
        app.registerOnThemeChangeHandler(handleThemeChange);
      }
    })();
  }, [
    inTeams
  ]);

  return (
    <Presenter
      lang={lang}
      themeName={themeName}>
      {children}
    </Presenter>
  );

}
