//
// Copyright (c) 2021-2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import {
  Link,
  Toast,
  ToastIntent,
  ToastTitle,
  ToastTrigger,
  Toaster,
  useId,
  useToastController
} from '@fluentui/react-components';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const ToastContext = React.createContext<(message: string, intent: ToastIntent) => void>(() => {});

export const useToast = (): (message: string, intent: ToastIntent) => void => {
  const props = React.useContext(ToastContext);
  if (props == null) {
    throw new Error('The context is not initialzed: ToastContext');
  }
  return props;
};

function ToastProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const toasterId = useId();
  const { dispatchToast } = useToastController(toasterId);

  const value = React.useMemo(() => (message: string, intent: ToastIntent) =>
    dispatchToast(
      (
        <Toast>
          <ToastTitle
            action={
              <ToastTrigger>
                <Link>
                  <FormattedMessage {...messages.Dismiss} />
                </Link>
              </ToastTrigger>
            }>
            {message}
          </ToastTitle>
        </Toast>
      ),
      {intent: intent}
    ),
  [
    dispatchToast
  ]);

  return (
    <React.Fragment>
      <Toaster toasterId={toasterId} />
      <ToastContext.Provider value={value}>
        {children}
      </ToastContext.Provider>
    </React.Fragment>
  );

}

export default ToastProvider;
