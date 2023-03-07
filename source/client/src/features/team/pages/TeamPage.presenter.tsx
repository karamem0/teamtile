//
// Copyright (c) 2023 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import LoaderPanal from '../../../components/LoaderPanel';
import { Item } from '../../../types/Store';
import EmptyPanel from '../components/EmptyPanel';
import TeamPanel from '../components/TeamPanel';

interface MainPageProps {
  items?: Item[],
  loading?: boolean
}

function TeamPage(props: MainPageProps) {

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

export default TeamPage;
