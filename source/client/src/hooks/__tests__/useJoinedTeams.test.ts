import { renderHook } from '@testing-library/react-hooks';
import useJoinedTeams from '../useJoinedTeams';
import json from './useJoinedTeams.test.json';

describe('useJoinedTeams', () => {

  it('return joined teams', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ',
      json: json
    };
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(params.json)
    } as Response));
    const { result, waitForNextUpdate } = renderHook(
      useJoinedTeams,
      {
        initialProps: {
          token: params.token
        }
      });
    await waitForNextUpdate();
    const [ teams ] = result.current;
    expect(teams?.length).toBe(params.json.value.length);
  });

});
