//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

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
      <meta
        content={intl.formatMessage(messages.AppCreator)}
        name="author" />
      <meta
        content={intl.formatMessage(messages.AppDescription)}
        name="description" />
      <title>
        {intl.formatMessage(messages.AppTitle)}
      </title>
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
