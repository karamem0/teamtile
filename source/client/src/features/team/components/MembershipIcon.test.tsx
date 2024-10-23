//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import MembershipIcon from './MembershipIcon.presenter';
import { MembershipType } from '../../../types/Entity';
import ThemeProvider from '../../../providers/ThemeProvider';
import { render } from '@testing-library/react';

it('should create shapshot of when value is "standard"', async () => {
  const params = {
    value: 'standard' as MembershipType
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <MembershipIcon {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create shapshot of when value is "private"', async () => {
  const params = {
    value: 'private' as MembershipType
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <MembershipIcon {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should create shapshot of when value is undefined', async () => {
  const params = {
    value: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <MembershipIcon {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
