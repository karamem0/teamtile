//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Event } from '../../../types/Event';
import Presenter from './TeamPanel.presenter';
import { clearCache } from '../managers/TeamManager';
import messages from '../messages';
import { useDebounce } from 'react-use';
import { useIntl } from 'react-intl';
import { useReducer } from '../../../providers/ReducerProvider';

function TeamPanel() {

  const {
    dispatchers
  } = useReducer();
  const intl = useIntl();
  const [ filter, setFilter ] = React.useState<string>();

  useDebounce(() => {
    dispatchers.setFilter(filter);
  }, 500, [
    dispatchers,
    filter
  ]);

  const handleFilterChange = React.useCallback((_?: Event, data?: string) => {
    setFilter(data);
  }, []);

  const handleLinkToGitHub = React.useCallback(() => {
    window.open(intl.formatMessage(messages.GitHubLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

  const handleLinkToPrivacyPolicy = React.useCallback(() => {
    window.open(intl.formatMessage(messages.PrivacyPolicyLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

  const handleLinkToTermsOfUse = React.useCallback(() => {
    window.open(intl.formatMessage(messages.TermsOfUseLink), '_blank', 'noreferrer');
  }, [
    intl
  ]);

  const handleRefreshClick = React.useCallback(async (e?: Event) => {
    if ((e as React.KeyboardEvent)?.shiftKey) {
      await clearCache();
    }
    dispatchers.setLoading(true);
  }, [ dispatchers ]);

  return (
    <Presenter
      onFilterChange={handleFilterChange}
      onLinkToGitHub={handleLinkToGitHub}
      onLinkToPrivacyPolicy={handleLinkToPrivacyPolicy}
      onLinkToTermsOfUse={handleLinkToTermsOfUse}
      onRefreshClick={handleRefreshClick} />
  );

}

export default TeamPanel;
