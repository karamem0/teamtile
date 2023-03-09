//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { render, screen } from '@testing-library/react';

import IntlProvider from '../../../providers/IntlProvider';
import { VisibilityType } from '../../../types/Entity';

import VisibilityIcon from './VisibilityIcon.presenter';

test('create shapshot of when VisibilityType is public', async () => {
  const params = {
    value: VisibilityType.public
  };
  render(
    <IntlProvider>
      <VisibilityIcon {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when VisibilityType is private', async () => {
  const params = {
    value: VisibilityType.private
  };
  render(
    <IntlProvider>
      <VisibilityIcon {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});

test('create shapshot of when VisibilityType is undefined', async () => {
  const params = {
    value: undefined
  };
  render(
    <IntlProvider>
      <VisibilityIcon {...params} />
    </IntlProvider>
  );
  expect((await screen.findAllByText(/^.*$/))[0]).toMatchSnapshot();
});
