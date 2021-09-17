//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Microsoft Teams
import * as microsoftTeams from '@microsoft/teams-js';
// Fluent UI
import {
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsV2Theme
} from '@fluentui/react-northstar';
import { ThemePrepared } from '@fluentui/styles';

export const useTheme = (): [ ThemePrepared | undefined ] => {

  const [ theme, setTheme ] = React.useState<ThemePrepared>(teamsV2Theme);

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
    microsoftTeams.initialize(() => {
      microsoftTeams.registerOnThemeChangeHandler(handleThemeChange);
      microsoftTeams.getContext((context) => {
        handleThemeChange(context.theme);
      });
    });
  }, []);

  return [ theme ];

};
