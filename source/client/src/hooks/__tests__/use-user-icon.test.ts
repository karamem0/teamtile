//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import { renderHook } from '@testing-library/react-hooks';
import * as microsoftGraph from '@microsoft/microsoft-graph-client';
import * as AppContext from '../../contexts/app-context';
import { useUserIcon } from '../use-user-icon';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('useUserIcon', () => {

  it('return user icon', async () => {
    const params = {
      id: '48d31887-5fad-4d73-a9f5-3c356e68a038',
      blob: new Blob(),
      url: 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258'
    };
    const setError = jest.fn();
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({
        api: () => ({
          get: () => Promise.resolve(params.blob)
        })
      } as unknown as microsoftGraph.Client);
    jest
      .spyOn(AppContext, 'useAppContext')
      .mockReturnValue({
        client: microsoftGraph.Client.initWithMiddleware({} as microsoftGraph.ClientOptions),
        setClient: undefined,
        error: undefined,
        setError: setError
      });
    URL.createObjectURL = jest.fn(() => params.url);
    URL.revokeObjectURL = jest.fn();
    const { result, waitForNextUpdate } = renderHook(
      useUserIcon,
      {
        initialProps: {
          id: params.id
        }
      });
    await waitForNextUpdate();
    const [ url ] = result.current;
    expect(url).toBe(params.url);
    expect(setError).not.toBeCalled();
  });

});
