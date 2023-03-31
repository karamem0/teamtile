//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  FluentProvider as Provider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  Theme
} from '@fluentui/react-components';

import { app } from '@microsoft/teams-js';

import { css } from '@emotion/react';

import { inTeams } from '../utils/Teams';

interface ThemeContextProps {
  theme: Theme
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const value = React.useContext(ThemeContext);
  if (!value) {
    throw new Error('The context is not initialzed: ThemeContext');
  }
  return value;
};

interface ThemeProviderProps {
  children?: React.ReactNode
}

function ThemeProvider(props: ThemeProviderProps) {

  const { children } = props;

  const [ theme, setTheme ] = React.useState<Theme>(teamsLightTheme);

  const handleThemeChange = (value: string) => {
    switch (value) {
      case 'dark':
        setTheme(teamsDarkTheme);
        break;
      case 'contrast':
        setTheme(teamsHighContrastTheme);
        break;
      default:
        setTheme(teamsLightTheme);
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
      handleThemeChange(context.app.theme);
      app.registerOnThemeChangeHandler(handleThemeChange);
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <Provider theme={theme}>
        <div
          css={css`
            min-height: 100vh;
            line-height: 1.25em;
            background-color: ${theme.colorNeutralBackground3};
          `}>
          {children}
        </div>
      </Provider>
    </ThemeContext.Provider>
  );

}

export default ThemeProvider;
