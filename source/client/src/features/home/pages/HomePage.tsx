//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useIntl } from 'react-intl';
import { Event } from '../../../types/Event';
import messages from '../messages';

import Presenter from './HomePage.presenter';

function HomePage() {

  const intl = useIntl();

  const handleLinkClick = React.useCallback((_: Event, data?: string) => {
    switch (data) {
      case 'GitHub':
        window.open(intl.formatMessage(messages.GitHubLink), '_blank');
        break;
      case 'PrivacyPolicy':
        window.open(intl.formatMessage(messages.PrivacyPolicyLink), '_blank');
        break;
      case 'TermsOfUse':
        window.open(intl.formatMessage(messages.TermsOfUseLink), '_blank');
        break;
      default:
        break;
    }
  }, [
    intl
  ]);

  return (
    <Presenter onLinkClick={handleLinkClick} />
  );

}

export default HomePage;
