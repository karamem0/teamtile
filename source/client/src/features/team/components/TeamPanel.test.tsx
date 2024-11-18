//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './TeamPanel.presenter';
import { render } from '@testing-library/react';

jest.mock('./TeamGrid', () =>
  function TeamGrid({ children }: React.PropsWithChildren<unknown>) {
    return (
      <div data-testid="test-TeamGrid">
        {children}
      </div>
    );
  }
);

it('should create a shapshot', () => {
  const params = {};
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
