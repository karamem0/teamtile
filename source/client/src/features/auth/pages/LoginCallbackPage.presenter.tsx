//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import CenterLayout from '../../../common/components/CenterLayout';
import { Spinner } from '@fluentui/react-components';
import messages from '../messages';
import { useIntl } from 'react-intl';

function LoginCallbackPage() {

  const intl = useIntl();

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet>
          <title>
            {`${intl.formatMessage(messages.LoginCallbackTitle)} - ${intl.formatMessage(messages.AppTitle)}`}
          </title>
        </Helmet>
      </HelmetProvider>
      <CenterLayout>
        <Spinner label={intl.formatMessage(messages.LoginCallbackDescription)} />
      </CenterLayout>
    </React.Fragment>
  );

}

export default React.memo(LoginCallbackPage);
