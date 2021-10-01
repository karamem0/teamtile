//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

/* eslint-disable import/first */

// Microsoft Teams
const microsoftTeams = {
  initialize: jest.fn(),
  getContext: jest.fn()
};
jest.mock('@microsoft/teams-js', () => ({
  __esModule: true,
  ...microsoftTeams
}));

// Testing Library
import { renderHook } from '@testing-library/react-hooks';
// Hooks
import { useContext } from '../use-context';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('useContext', () => {

  it('return context', () => {
    const params = {
      context: {}
    };
    microsoftTeams.initialize
      .mockImplementation((callback) => callback && callback());
    microsoftTeams.getContext
      .mockImplementation((callback) => callback && callback(params.context));
    const { result } = renderHook(useContext);
    const [ context ] = result.current;
    expect(context).toBe(params.context);
    expect(microsoftTeams.initialize).toBeCalled();
    expect(microsoftTeams.getContext).toBeCalled();
  });

});
