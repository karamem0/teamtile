import { renderHook } from '@testing-library/react-hooks';
import useTeamChannels from '../useTeamChannels';
import json from './useTeamChannels.test.json';

describe('useTeamChannels', () => {

  it('return team channels', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      json: json
    };
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(params.json)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(
      useTeamChannels,
      {
        initialProps: {
          token: params.token,
          id: params.id
        }
      });
    await waitForNextUpdate();
    const [ teams ] = result.current;
    expect(teams?.length).toBe(params.json.value.length);
  });

});
