//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  teamsV2Theme,
  teamsDarkV2Theme,
  teamsHighContrastTheme
} from '@fluentui/react-northstar';
import { ThemePrepared } from '@fluentui/styles';

const useTheme = (): [ ThemePrepared | undefined ] => {

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

export { useTheme };