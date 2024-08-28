//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import EmptyPanel from '../components/EmptyPanel';
import { Item } from '../../../types/Store';
import LoaderPanal from '../../../common/components/LoaderPanel';
import TeamPanel from '../components/TeamPanel';

interface MainPageProps {
  items?: Item[],
  loading?: boolean
}

function TeamPage(props: Readonly<MainPageProps>) {

  const {
    items,
    loading
  } = props;

  switch (loading) {
    case true:
      return (
        <LoaderPanal />
      );
    case false:
      if (items?.length) {
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

}

export default React.memo(TeamPage);
