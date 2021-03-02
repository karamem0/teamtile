import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme
} from '@fluentui/react-northstar';
import { ThemePrepared } from '@fluentui/styles';

interface ThemeProps {
  context?: microsoftTeams.Context;
}

const useTheme = (props: ThemeProps): [ThemePrepared | undefined] => {

  const { context } = props;
  const [ theme, setTheme ] = React.useState<ThemePrepared>();

  React.useEffect(() => {
    microsoftTeams.initialize(() => {
      microsoftTeams.registerOnThemeChangeHandler(handleThemeChange);
    });
  }, []);

  React.useEffect(() => {
    if (!context?.theme) {
      return;
    }
    handleThemeChange(context.theme);
  }, [ context ]);

  const handleThemeChange = (value: string) => {
    switch (value) {
      case 'dark':
        setTheme(teamsDarkTheme);
        break;
      case 'contrast':
        setTheme(teamsHighContrastTheme);
        break;
      default:
        setTheme(teamsTheme);
        break;
    }
  };

  return [ theme ];

};

export default useTheme;
