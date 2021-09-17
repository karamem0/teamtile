//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// Testing Library
import { renderHook } from '@testing-library/react-hooks';
// Microsoft Teams
import * as microsoftTeams from '@microsoft/teams-js';
// Hooks
import { useContext } from '../use-context';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('useContext', () => {

  it('return context', () => {
    const params = {
      context: {} as microsoftTeams.Context
    };
    jest
      .spyOn(microsoftTeams, 'initialize')
      .mockImplementation((callback) => callback && callback());
    jest
      .spyOn(microsoftTeams, 'getContext')
      .mockImplementation((callback) => callback(params.context));
    const { result } = renderHook(useContext);
    const [ context ] = result.current;
    expect(context).toBe(params.context);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.getContext).toBeCalled();
  });

});
