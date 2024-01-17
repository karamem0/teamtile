//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';

import { Spinner } from '@fluentui/react-components';

import CenterLayout from '../../../common/components/CenterLayout';
import messages from '../messages';

function LoginRedirectPage() {

  const intl = useIntl();

  return (
    <CenterLayout>
      <Spinner label={intl.formatMessage(messages.LoginRedirect)} />
    </CenterLayout>
  );

}

export default React.memo(LoginRedirectPage);
