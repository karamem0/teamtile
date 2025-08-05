//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import IntlProvider from '../../providers/IntlProvider';
import { MessageBarIntent } from '@fluentui/react-components';
import { render } from '@testing-library/react';

import Presenter from './Snackbar.presenter';

it('should match the snapshot when the text is undefined', () => {
  const params = {
    intent: undefined,
    text: undefined
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the text is error', () => {
  const params = {
    intent: 'error' as MessageBarIntent,
    text: 'error'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the text is warning', () => {
  const params = {
    intent: 'warning' as MessageBarIntent,
    text: 'warning'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it('should match the snapshot when the text is success', () => {
  const params = {
    intent: 'success' as MessageBarIntent,
    text: 'success'
  };
  const { asFragment } = render(
    <IntlProvider>
      <Presenter {...params} />
    </IntlProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
