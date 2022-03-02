//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

const errorContextValue = {
  setError: jest.fn()
};
jest.mock('../../contexts/error-context', () => ({
  useErrorContext: jest.fn().mockReturnValue(errorContextValue)
}));

const reducerContextValue = {
  dispatchers: {
    dispatchChannels: jest.fn(),
    dispatchDrives: jest.fn(),
    dispatchFilter: jest.fn(),
    dispatchKeys: jest.fn(),
    dispatchLoading: jest.fn(),
    dispatchMemberIcons: jest.fn(),
    dispatchMembers: jest.fn(),
    dispatchTeamIcons: jest.fn(),
    dispatchTeams: jest.fn()
  }
};
jest.mock('../../contexts/reducer-context', () => ({
  useReducerContext: jest.fn().mockReturnValue(reducerContextValue)
}));

const serviceContextValue = {
  services: {
    getChannels: jest.fn(),
    getDrives: jest.fn(),
    getKeys: jest.fn(),
    getMemberIcons: jest.fn(),
    getMembers: jest.fn(),
    getTeamIcons: jest.fn(),
    getTeams: jest.fn()
  }
};
jest.mock('../../contexts/service-context', () => ({
  useServiceContext: jest.fn().mockReturnValue(serviceContextValue)
}));

import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { useItemLoader } from '../use-item-loader';

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('loadItems', () => {

  it('return keys if succeeded', async () => {
    const params = {
      keys: [
        '02bd9fd6-8f93-4758-87c3-1fb73740a315',
        '13be6971-79db-4f33-9d41-b25589ca25af',
        '8090c93e-ba7c-433e-9f39-08c7ba07c0b3'
      ]
    };
    serviceContextValue.services
      .getKeys
      .mockResolvedValue(params.keys);
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    loadItems();
    await waitFor(() => expect(reducerContextValue.dispatchers.dispatchLoading).toBeCalled());
    await waitFor(() => expect(reducerContextValue.dispatchers.dispatchKeys).toBeCalled());
    await waitFor(() => expect(reducerContextValue.dispatchers.dispatchTeams).toBeCalled());
    await waitFor(() => expect(reducerContextValue.dispatchers.dispatchTeamIcons).toBeCalled());
    await waitFor(() => expect(reducerContextValue.dispatchers.dispatchChannels).toBeCalled());
    await waitFor(() => expect(reducerContextValue.dispatchers.dispatchMembers).toBeCalled());
    await waitFor(() => expect(reducerContextValue.dispatchers.dispatchDrives).toBeCalled());
  });

  it('return error if failed', async () => {
    const params = {
      error: 'Something went wrong'
    };
    serviceContextValue.services
      .getKeys
      .mockRejectedValue(new Error(params.error));
    const { result } = renderHook(useItemLoader);
    const { loadItems } = result.current;
    loadItems();
    await waitFor(() => expect(errorContextValue.setError).toBeCalled());
  });

});
