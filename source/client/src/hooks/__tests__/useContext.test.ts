import { renderHook } from '@testing-library/react-hooks';
import * as microsoftTeams from '@microsoft/teams-js';
import useContext from '../useContext';

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
