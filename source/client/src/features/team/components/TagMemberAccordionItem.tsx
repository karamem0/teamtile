//
// Copyright (c) 2021-2024 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useAsyncFn, useError } from 'react-use';
import Presenter from './TagMemberAccordionItem.presenter';
import { Tag } from '../../../types/Entity';
import { getTagMembers } from '../managers/TeamManager';

interface TagMemberAccordionItemProps {
  id?: string,
  open?: boolean,
  tag?: Tag
}

function TagMemberAccordionItem(props: Readonly<TagMemberAccordionItemProps>) {

  const {
    id,
    open,
    tag
  } = props;

  const dispatchError = useError();
  const [ state, fetch ] = useAsyncFn((teamId: string, tagId: string) => getTagMembers(teamId, tagId));

  React.useEffect(() => {
    if (state.error == null) {
      return;
    }
    dispatchError(state.error);
  }, [
    state.error,
    dispatchError
  ]);

  React.useEffect(() => {
    (async () => {
      if (id == null) {
        return;
      }
      if (tag?.id == null) {
        return;
      }
      if (open) {
        await fetch(id, tag.id);
      }
    })();
  }, [
    id,
    open,
    tag,
    fetch
  ]);

  return (
    <Presenter
      loading={state.loading}
      members={state.value}
      tag={tag} />
  );

}

export default TagMemberAccordionItem;
