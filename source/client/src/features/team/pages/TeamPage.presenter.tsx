//
// Copyright (c) 2021-2025 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import EmptyPanel from '../components/EmptyPanel';
import LoaderPanal from '../../../common/components/LoaderPanel';
import { TeamCard } from '../../../types/Store';
import TeamPanel from '../components/TeamPanel';
import messages from '../messages';
import { useIntl } from 'react-intl';

interface MainPageProps {
  cards?: TeamCard[],
  loading?: boolean
}

function TeamPage(props: Readonly<MainPageProps>) {

  const {
    cards,
    loading
  } = props;

  const intl = useIntl();

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet>
          <meta
            content="karamem0"
            name="author" />
          <meta
            content={intl.formatMessage(messages.AppDescription)}
            name="description" />
          <meta
            content="summary"
            name="twitter:card" />
          <meta
            content="@karamem0"
            name="twitter:site" />
          <meta
            content="@karamem0"
            name="twitter:creator" />
          <meta
            content={location.origin}
            property="og:url" />
          <meta
            content="Teamtile"
            property="og:title" />
          <meta
            content={intl.formatMessage(messages.AppDescription)}
            property="og:description" />
          <meta
            content={`${location.origin}/assets/screenshots/001.png`}
            property="og:image" />
          <title>
            {intl.formatMessage(messages.AppTitle)}
          </title>
        </Helmet>
      </HelmetProvider>
      {
        (() => {
          switch (loading) {
            case true:
              return (
                <LoaderPanal />
              );
            case false:
              if (cards?.length) {
                return (
                  <TeamPanel />
                );
              } else {
                return (
                  <EmptyPanel />
                );
              }
            default:
              return null;
          }
        })()
      }
    </React.Fragment>
  );

}

export default React.memo(TeamPage);
