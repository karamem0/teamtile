//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Event } from '../../../types/Event';
import Presenter from './HomePage.presenter';
import messages from '../messages';
import { useIntl } from 'react-intl';

function HomePage() {

  const intl = useIntl();

  const handleLinkClick = React.useCallback((_?: Event, data?: string) => {
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
