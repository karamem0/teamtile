//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

import React from 'react';
import Dexie from 'dexie';

interface IndexedDbValue {
  db?: Dexie
}

const IndexedDb = React.createContext<IndexedDbValue>({});

interface IndexedDbProviderProps {
  children: React.ReactNode
}

const IndexedDbProvider = ({ children }: IndexedDbProviderProps): React.ReactElement => {

  const [ dexie, setDexie ] = React.useState<Dexie>();

  React.useEffect(() => {
    const dexie = new Dexie('teamtile');
    dexie.version(2).stores({
      teams:
        '&id, internalId, name, description, visibility, url,' +
        ' icon.data,' +
        ' channel.count, channel.nextLink,' +
        ' channel.values.id, channel.values.name, channel.values.url,' +
        ' member.count, member.nextLink,' +
        ' member.values.id, member.values.name, member.values.url,' +
        ' drive.id, drive.url,' +
        ' timestamp'
    });
    setDexie(dexie);
  }, []);

  return (
    <IndexedDb.Provider value={{ db: dexie }}>
      {children}
    </IndexedDb.Provider>
  );

};

interface IndexedDbConsumerProps {
  children: (value: IndexedDbValue) => React.ReactNode
}

const IndexedDbConsumer = ({ children }: IndexedDbConsumerProps): React.ReactElement => {

  return (
    <IndexedDb.Consumer>
      {children}
    </IndexedDb.Consumer>
  );

};

const useIndexedDb = (): IndexedDbValue => React.useContext(IndexedDb);

export {
  IndexedDbProvider,
  IndexedDbConsumer,
  useIndexedDb
};
