import { renderHook } from '@testing-library/react-hooks';
import useTeamIcon from '../useTeamIcon';

describe('useTeamIcon', () => {

  it('return team icon', async () => {
    const params = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0VSVkVSVE9LRU4ifQ.VyFNrKBsnkQaLhXMbM-cDlGZMaQEuPmy8I6OCeGGBSQ',
      id: '02bd9fd6-8f93-4758-87c3-1fb73740a315',
      blob: new Blob(),
      url: 'https://developer.microsoft.com/85003a80-9e86-4d59-a4a9-97553797bbe3'
    };
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      blob: () => Promise.resolve(params.blob)
    } as Response));
    global.URL.createObjectURL = jest.fn(() => params.url);
    const { result, waitForNextUpdate } = renderHook(
      useTeamIcon,
      {
        initialProps: {
          token: params.token,
          id: params.id
        }
      });
    await waitForNextUpdate();
    const [ url ] = result.current;
    expect(url).toBe(params.url);
  });

});
