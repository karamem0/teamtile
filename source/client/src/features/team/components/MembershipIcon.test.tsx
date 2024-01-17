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
import { MembershipType } from '../../../types/Entity';

import MembershipIcon from './MembershipIcon.presenter';

test('create shapshot of when MembershipType is standard', async () => {
  const params = {
    value: MembershipType.standard
  };
  const { asFragment } = render(
    <IntlProvider>
      <MembershipIcon {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when MembershipType is private', async () => {
  const params = {
    value: MembershipType.private
  };
  const { asFragment } = render(
    <IntlProvider>
      <MembershipIcon {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

test('create shapshot of when MembershipType is undefined', async () => {
  const params = {
    value: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <MembershipIcon {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
