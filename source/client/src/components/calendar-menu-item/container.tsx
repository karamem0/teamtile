//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

import { app, appInstallDialog, HostClientType } from '@microsoft/teams-js';

import { useServiceContext } from '../../contexts/service-context';
import { TeamWithMail } from '../../types/entity';
import { ItemKey, ItemValue } from '../../types/state';

import Presenter from './presenter';

interface CalendarMenuItemProps {
  itemKey: ItemKey,
  itemValue: ItemValue
}

export default function CalendarMenuItem ({
  itemValue
}: CalendarMenuItemProps): React.ReactElement | null {

  const { services } = useServiceContext();
  const [ loading, setLoading ] = React.useState<boolean>(false);

  const handleClick = React.useCallback(async (_, data: TeamWithMail | undefined) => {
    if (!data?.id || !data?.internalId || !data.mail) {
      return;
    }
    const [ name, domain ] = data.mail.split('@');
    const context = await app.getContext();
    switch (context.app.host.clientType) {
      case HostClientType.desktop:
      case HostClientType.web: {
        try {
          setLoading(true);
          const appId = process.env.APP_CHANNEL_CALENDAR_APP_ID;
          const tab = await services
            .getTabs(data.id, data.internalId)
            .then((tabs) => tabs.find((tab) => tab.appId === appId));
          if (tab?.webUrl) {
            app.openLink(tab.webUrl);
          } else if (appInstallDialog.isSupported()) {
            await appInstallDialog.openAppInstallDialog({ appId });
          } else {
            const [ name, domain ] = data.mail.split('@');
            app.openLink(`https://outlook.office.com/calendar/group/${domain}/${name}`);
          }
        } finally {
          setLoading(false);
        }
        break;
      }
      default:
        app.openLink(`https://outlook.office.com/calendar/group/${domain}/${name}`);
        break;
    }
  }, [
    services
  ]);

  if (!itemValue.drive) {
    return null;
  }

  return (
    <Presenter
      loading={loading}
      team={itemValue}
      onClick={handleClick} />
  );

}
