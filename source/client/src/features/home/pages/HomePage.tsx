//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './HomePage.presenter';

function HomePage() {

  const handleLinkClick = React.useCallback((_, data?: string) => {
    switch (data) {
      case 'GitHub':
        window.open('https://github.com/karamem0/teamtile', '_blank');
        break;
      case 'TermsOfUse':
        window.open('https://github.com/karamem0/teamtile/blob/main/TERMS_OF_USE.md', '_blank');
        break;
      case 'PrivacyPolicy':
        window.open('https://github.com/karamem0/teamtile/blob/main/PRIVACY.md', '_blank');
        break;
      default:
        break;
    }
  }, []);

  return (
    <Presenter onLinkClick={handleLinkClick} />
  );

}

export default HomePage;
