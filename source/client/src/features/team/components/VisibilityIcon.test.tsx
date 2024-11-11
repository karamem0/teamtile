//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../../providers/IntlProvider';
import ThemeProvider from '../../../providers/ThemeProvider';
import VisibilityIcon from './VisibilityIcon.presenter';
import { VisibilityType } from '../../../types/Entity';
import { render } from '@testing-library/react';

it('should create a shapshot when value is public', () => {
  const params = {
    type: 'public' as VisibilityType
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

it('should create a shapshot when value is private', () => {
  const params = {
    type: 'private' as VisibilityType
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

it('should create a shapshot when value is undefined', () => {
  const params = {
    type: undefined
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
