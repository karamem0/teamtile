import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';

const useToken = (): [string | undefined, string | undefined] => {

  const [ token, setToken ] = React.useState<string>();
  const [ error, setError ] = React.useState<string>();

  React.useEffect(() => {
    microsoftTeams.initialize(() => {
      microsoftTeams.authentication.getAuthToken({
        successCallback: handleSuccessSingleSignOn,
        failureCallback: handleFailureSingleSignOn
      });
    });
  }, []);

  const handleSuccessSingleSignOn = (value: string) => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/token`,
          {
            method: 'POST',
            body: value,
            mode: 'cors'
          }
        );
        if (response.ok) {
          setToken(await response.text());
        } else {
          if (response.status === 403) {
            microsoftTeams.authentication.authenticate({
              url: `${window.location.origin}/auth/login`,
              width: 600,
              height: 535,
              successCallback: handleSuccessConsent,
              failureCallback: handleFailureConsent
            });
          } else {
            handleFailureSingleSignOn(await response.text());
          }
        }
      } catch (error) {
        handleFailureSingleSignOn(error.toString());
      }
    })();
  };

  const handleFailureSingleSignOn = (value: string) => {
    setError(value);
  };

  const handleSuccessConsent = (value: string | undefined) => {
    setToken(value);
  };

  const handleFailureConsent = (value: string | undefined) => {
    setError(value);
  };

  return [
    token,
    error
  ];

};

export default useToken;
