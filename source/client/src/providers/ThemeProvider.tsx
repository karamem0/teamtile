//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  FluentProvider as Provider,
  Theme,
  createLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme
} from '@fluentui/react-components';
import { app } from '@microsoft/teams-js';
import { css } from '@emotion/react';

const customThemePalette = {
  10: '#020303',
  20: '#14181a',
  30: '#1f282c',
  40: '#27343a',
  50: '#304149',
  60: '#394e58',
  70: '#425b68',
  80: '#4c6978',
  90: '#557889',
  100: '#5f869a',
  110: '#6995ab',
  120: '#73a4bd',
  130: '#7db3cf',
  140: '#87c3e1',
  150: '#96d2f1',
  160: '#b6dff5'
};

const customTheme = createLightTheme(customThemePalette);

interface ThemeContextState {
  theme: Theme
}

const ThemeContext = React.createContext<ThemeContextState | undefined>(undefined);

export const useTheme = (): ThemeContextState => {
  const value = React.useContext(ThemeContext);
  if (value == null) {
    throw new Error('The context is not initialzed: ThemeContext');
  }
  return value;
};

function ThemeProvider(props: Readonly<React.PropsWithChildren>) {

  const {
    children
  } = props;

  const [ theme, setTheme ] = React.useState<Theme>(app.isInitialized() ? teamsLightTheme : customTheme);

  const handleThemeChange = (value: string) => {
    switch (value) {
      case 'custom':
        setTheme(customTheme);
        break;
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

  const value = React.useMemo<ThemeContextState>(() => ({ theme }), [
    theme
  ]);

  React.useEffect(() => {
    if (app.isInitialized()) {
      (async () => {
        const context = await app.getContext();
        handleThemeChange(context.app.theme);
        app.registerOnThemeChangeHandler(handleThemeChange);
      })();
    } else {
      handleThemeChange('custom');
    }
  }, []);

  return (
    <ThemeContext.Provider value={value}>
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
