//
// Copyright (c) 2022 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/main/LICENSE
//

import React from 'react';

interface BlobUrlValue {
  url: string | null
}

export const useBlobUrl = (data: string | null | undefined): BlobUrlValue => {

  const [ url, setUrl ] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!data) {
      return;
    }
    const bytes = window.atob(data);
    const array = Uint8Array.from(bytes, c => c.charCodeAt(0));
    for (let index = 0; index < array.length; index++) {
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
  }, [
    data
  ]);

  return {
    url
  };

};
