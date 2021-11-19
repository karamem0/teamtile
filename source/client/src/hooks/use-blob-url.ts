//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';

export const useBlobUrl = (data: string | null | undefined): [string | null] => {

  const [ url, setUrl ] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!data) {
      return;
    }
    const bytes = Buffer.from(data, 'base64').toString('binary');
    const array = new Uint8Array(bytes.length);
    for (let index = 0; index < bytes.length; index++) {
      array[index] = bytes.charCodeAt(index);
    }
    const blob = new Blob([ array ]);
    const url = URL.createObjectURL(blob);
    setUrl(url);
    return () => {
      if (!url) {
        return;
      }
      URL.revokeObjectURL(url);
    };
  }, [ data ]);

  return [
    url
  ];

};
