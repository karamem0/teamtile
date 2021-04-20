import { renderHook } from '@testing-library/react-hooks';
import * as microsoftTeams from '@microsoft/teams-js';
import {
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsV2Theme
} from '@fluentui/react-northstar';
import useTheme from '../useTheme';

describe('useTheme', () => {

  it('return default theme', () => {
    const params = {
      context: {
        theme: 'default'
      } as microsoftTeams.Context
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams, 'registerOnThemeChangeHandler')
      .mockImplementation((callback) => params.context.theme && callback(params.context.theme));
    const { result } = renderHook(
      props => useTheme(props),
      { initialProps: { context: params.context } }
    );
    expect(result.current[0]).toBe(teamsV2Theme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

  it('return dark theme', () => {
    const params = {
      context: {
        theme: 'dark'
      } as microsoftTeams.Context
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams, 'registerOnThemeChangeHandler')
      .mockImplementation((callback) => params.context.theme && callback(params.context.theme));
    const { result } = renderHook(
      props => useTheme(props),
      { initialProps: { context: params.context } }
    );
    expect(result.current[0]).toBe(teamsDarkV2Theme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

  it('return high contrast theme', () => {
    const params = {
      context: {
        theme: 'contrast'
      } as microsoftTeams.Context
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams, 'registerOnThemeChangeHandler')
      .mockImplementation((callback) => params.context.theme && callback(params.context.theme));
    const { result } = renderHook(
      props => useTheme(props),
      { initialProps: { context: params.context } }
    );
    const [ theme ] = result.current;
    expect(theme).toBe(teamsHighContrastTheme);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.registerOnThemeChangeHandler).toBeCalled();
  });

});
