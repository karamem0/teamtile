//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';

import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import { VisibilityType } from '../../../types/Entity';

import VisibilityIcon from './VisibilityIcon.presenter';

test('create shapshot of when VisibilityType is public', async () => {
  const params = {
    value: VisibilityType.public
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <VisibilityIcon {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when VisibilityType is private', async () => {
  const params = {
    value: VisibilityType.private
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <VisibilityIcon {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when VisibilityType is undefined', async () => {
  const params = {
    value: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <VisibilityIcon {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
