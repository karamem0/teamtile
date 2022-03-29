//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import Presenter from './presenter';

export default function HomePage (): React.ReactElement | null {

  const handleGitHubClick = React.useCallback(() => {
    window.open('https://github.com/karamem0/teamtile', '_blank');
  }, []);

  const handlePrivacyClick = React.useCallback(() => {
    window.open('https://github.com/karamem0/teamtile/blob/main/PRIVACY.md', '_blank');
  }, []);

  const handleTermsOfUseClick = React.useCallback(() => {
    window.open('https://github.com/karamem0/teamtile/blob/main/TERMS_OF_USE.md', '_blank');
  }, []);

  return (
    <Presenter
      onGitHubClick={handleGitHubClick}
      onPrivacyClick={handlePrivacyClick}
      onTermsOfUseClick={handleTermsOfUseClick} />
  );

}
