//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { setFilter, setLoading } from '../../../stores/Action';
import { Event } from '../../../types/Event';
import { clearCache } from '../managers/TeamManager';
import messages from '../messages';
import { useDebounce } from 'react-use';
import { useIntl } from 'react-intl';
import { useStore } from '../../../providers/StoreProvider';

import Presenter from './TeamPanel.presenter';

function TeamPanel() {

  const { dispatch } = useStore();
  const intl = useIntl();
  const [ cache, setCache ] = React.useState<string>();

  useDebounce(() => {
    dispatch(setFilter(cache));
  }, 500, [
    cache,
    dispatch
  ]);

  const handleFilterChange = React.useCallback((_: Event, data?: string) => {
    setCache(data);
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

  const handleRefreshClick = React.useCallback(async (event: Event) => {
    const { shiftKey } = event as KeyboardEvent;
    if (shiftKey) {
      await clearCache();
    }
    dispatch(setLoading(true));
  }, [
    dispatch
  ]);

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
