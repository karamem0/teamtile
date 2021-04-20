import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  teamsV2Theme,
  teamsDarkV2Theme,
  teamsHighContrastTheme
} from '@fluentui/react-northstar';
import { ThemePrepared } from '@fluentui/styles';

interface ThemeProps {
  context?: microsoftTeams.Context;
}

const useTheme = (props: ThemeProps): [ ThemePrepared | undefined ] => {

  const { context } = props;
  const [ theme, setTheme ] = React.useState<ThemePrepared>();

  React.useEffect(() => {
    let initialized = false;
    microsoftTeams.initialize(() => {
      microsoftTeams.registerOnThemeChangeHandler(handleThemeChange);
      initialized = true;
    });
    if (!initialized) {
      handleThemeChange(undefined);
    }
  }, []);

  React.useEffect(() => {
    if (!context?.theme) {
      return;
    }
    handleThemeChange(context.theme);
  }, [ context ]);

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

  return [ theme ];

};

export default useTheme;
