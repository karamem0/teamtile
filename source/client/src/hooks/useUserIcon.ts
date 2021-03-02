import React from 'react';

interface UserIconProps {
  token?: string;
  id?: string;
}

const useUserIcon = (props: UserIconProps): [ string | undefined ] => {

  const { token, id } = props;
  const [ icon, setIcon ] = React.useState<string>();

  React.useEffect(() => {
    if (!token) {
      return;
    }
    if (!id) {
      return;
    }
    (async () => {
      const response = await fetch(
        `https://graph.microsoft.com/beta/users/${id}/photo/$value`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'GET',
          mode: 'cors'
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const value = window.URL.createObjectURL(blob);
        setIcon(value);
      }
    })();
    return () => {
      if (!icon) {
        return;
      }
      window.URL.revokeObjectURL(icon);
    };
  }, [ token, id ]);

  return [ icon ];

};

export default useUserIcon;
