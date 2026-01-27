//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render } from '@testing-library/react';
import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import { MembershipType } from '../../../types/Entity';

import Presenter from './MembershipIcon.presenter';

it('should match the snapshot when the type is shared', () => {
  const params = {
    type: 'shared' as MembershipType
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the type is standard', () => {
  const params = {
    type: 'standard' as MembershipType
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the type is private', () => {
  const params = {
    type: 'private' as MembershipType
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the type is undefined', () => {
  const params = {
    type: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <ThemeProvider>
        <Presenter {...params} />
      </ThemeProvider>
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
