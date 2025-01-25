//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import Presenter from './VisibilityIcon.presenter';
import ThemeProvider from '../../../providers/ThemeProvider';
import { VisibilityType } from '../../../types/Entity';
import { render } from '@testing-library/react';

it('should create a shapshot when the type parameter is public', () => {
  const params = {
    type: 'public' as VisibilityType
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

it('should create a shapshot when the type parameter is private', () => {
  const params = {
    type: 'private' as VisibilityType
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

it('should create a shapshot when the type parameter is undefined', () => {
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
