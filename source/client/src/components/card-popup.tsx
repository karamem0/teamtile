//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';
import { useDebounce } from 'react-use';

import { SearchIcon } from '@fluentui/react-icons-mdl2';
import {
  ComponentEventHandler,
  Input,
  Popup,
  PopupProps
} from '@fluentui/react-northstar';

import { css } from '@emotion/react';

export interface CardPopupProps<T> {
  values: T[],
  predicate: (filter: string, value: T) => boolean,
  renderer: (values: T[]) => React.ReactNode,
  trigger: React.ReactElement,
  onOpenChange?: ComponentEventHandler<PopupProps>
}

export const CardPopup = <T, >({
  values,
  renderer,
  predicate,
  trigger,
  onOpenChange
}: CardPopupProps<T>): React.ReactElement | null => {

  const [ results, setResults ] = React.useState(values);
  const [ filter, setFilter ] = React.useState<string>('');

  useDebounce(() => {
    if (!filter) {
      setResults(values);
      return;
    }
    setResults(values.filter((value) => predicate(filter, value)));
  }, 500, [
    values,
    filter
  ]);

  const handleChange = React.useCallback((filter: string) => {
    setFilter(filter);
  }, []);

  return (
    <Popup
      content={
        <div
          css={css`
            width: 12rem;
            max-height: 24rem;
            margin: -0.5rem;
            overflow: auto;
          `}>
          <div
            css={css`
              display: flex;
              flex-flow: column;
              gap: 0.25rem;
            `}>
            <Input
              clearable
              fluid
              icon={<SearchIcon />}
              onChange={(_, props) => handleChange(props?.value || '')} />
            {renderer(results)}
          </div>
        </div>
      }
      trigger={trigger}
      onOpenChange={onOpenChange} />
  );

};
