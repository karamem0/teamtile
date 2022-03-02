//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { useErrorContext } from '../contexts/error-context';
import { useReducerContext } from '../contexts/reducer-context';
import { useServiceContext } from '../contexts/service-context';
import { KeyValue } from '../types/common';
import {
  ItemKey,
  ItemValue,
  Loading
} from '../types/state';

interface ItemLoaderValue {
  loadItems: () => void,
  loadMemberIcons: (item: KeyValue<ItemKey, ItemValue>) => void
}

export const useItemLoader = (): ItemLoaderValue => {

  const { setError } = useErrorContext();
  const { dispatchers } = useReducerContext();
  const { services } = useServiceContext();

  const loadItems = React.useCallback(() => {
    (async () => {
      try {
        dispatchers.dispatchLoading(Loading.keys);
        const keys = await services.getKeys();
        if (!keys) {
          return;
        }
        dispatchers.dispatchKeys(keys);
        dispatchers.dispatchLoading(Loading.values);
        await Promise.all([
          dispatchers.dispatchTeams(await services.getTeams(keys)),
          dispatchers.dispatchTeamIcons(await services.getTeamIcons(keys)),
          dispatchers.dispatchChannels(await services.getChannels(keys)),
          dispatchers.dispatchMembers(await services.getMembers(keys)),
          dispatchers.dispatchDrives(await services.getDrives(keys))
        ]);
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : Object.prototype.toString.call(error);
        setError(message);
      } finally {
        dispatchers.dispatchLoading(Loading.done);
      }
    })();
  }, [
    setError,
    dispatchers,
    services
  ]);

  const loadMemberIcons = React.useCallback(({ key, value }: KeyValue<ItemKey, ItemValue>) => {
    (async () => {
      try {
        if (!value.members) {
          return;
        }
        dispatchers.dispatchMemberIcons({
          key: key,
          value: await services.getMemberIcons(value.members
            .map(member => member.userId)
            .filter((key): key is Exclude<typeof key, null | undefined> => Boolean(key)))
        });
      } catch (error) {
        const message = error instanceof Error
          ? error.message
          : Object.prototype.toString.call(error);
        setError(message);
      } finally {
        dispatchers.dispatchLoading(Loading.done);
      }
    })();
  }, [
    setError,
    dispatchers,
    services
  ]);

  return {
    loadItems,
    loadMemberIcons
  };

};
