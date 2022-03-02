//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Provider,
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsV2Theme
} from '@fluentui/react-northstar';
import { ThemePrepared } from '@fluentui/styles';

import { app } from '@microsoft/teams-js';

import { useInTeams } from '../hooks/use-in-teams';

export const ThemeProvider: React.FC = ({ children }) => {

  const [ theme, setTheme ] = React.useState<ThemePrepared>(teamsV2Theme);
  const { inTeams } = useInTeams();

  const handleThemeChange = (value: string | undefined) => {
    switch (value) {
      case 'dark':
        setTheme(teamsDarkV2Theme);
        break;
      case 'contrast':
        setTheme(teamsHighContrastTheme);
        break;
      default:
        setTheme(teamsV2Theme);
        break;
    }
  };

  React.useEffect(() => {
    (async () => {
      if (inTeams) {
        await app.initialize();
        const context = await app.getContext();
        handleThemeChange(context.app.theme);
        app.registerOnThemeChangeHandler(handleThemeChange);
      }
    })();
  }, [
    inTeams
  ]);

  return (
    <Provider theme={theme}>
      {children}
    </Provider>
  );

};
