//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import * as microsoftGraph from '@microsoft/microsoft-graph-client';
import useUserIcon from '../useUserIcon';

describe('useUserIcon', () => {

  it('return user icon', async () => {
    const params = {
      id: '48d31887-5fad-4d73-a9f5-3c356e68a038',
      blob: new Blob(),
      url: 'https://developer.microsoft.com/a58b2c26-9c78-4c9a-a47d-a48bbcd12258'
    };
    jest
      .spyOn(microsoftGraph.Client, 'initWithMiddleware')
      .mockReturnValue({
        api: () => ({
          get: () => Promise.resolve(params.blob)
        })
      } as unknown as microsoftGraph.Client);
    jest
      .spyOn(React, 'useContext')
      .mockReturnValue([
        microsoftGraph.Client.initWithMiddleware({} as microsoftGraph.ClientOptions),
        undefined,
        undefined,
        jest.fn()
      ]);
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
  });

});
