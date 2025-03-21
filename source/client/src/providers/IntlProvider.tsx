//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  MessageFormatElement,
  IntlProvider as Provider,
  createIntl
} from 'react-intl';
import en from '../translations/compiled/en.json';
import ja from '../translations/compiled/ja.json';

const translations: { [key: string]: Record<string, MessageFormatElement[]> } = {
  en,
  ja
};

const intl = createIntl({
  defaultLocale: 'en',
  locale: window.navigator.language.substring(0, 2),
  messages: translations[window.navigator.language.substring(0, 2)]
});

function IntlProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  return (
    <Provider {...intl}>
      {children}
    </Provider>
  );

}

export default IntlProvider;
