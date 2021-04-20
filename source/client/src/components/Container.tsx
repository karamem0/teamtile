import React from 'react';
import AppContext from '../contexts/AppContext';
import useToken from '../hooks/useToken';
import LoaderPanel from './LoaderPanel';
import ErrorPanel from './ErrorPanel';
import TeamPanel from './TeamPanel';

const Container: React.FC = () => {

  const [ , setToken ] = React.useContext(AppContext);
  const [ token, error ] = useToken();

  React.useEffect(() => {
    if (!setToken) {
      return;
    }
    setToken(token);
  }, [ setToken, token ]);

  if (error) {
    return (
      <ErrorPanel />
    );
  }

  if (!token) {
    return (
      <LoaderPanel />
    );
  }

  return (
    <TeamPanel />
  );

};

export default Container;
