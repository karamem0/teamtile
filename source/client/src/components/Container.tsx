import React from 'react';
import AppContext from '../contexts/AppContext';
import useToken from '../hooks/useToken';
import Loading from './Loading';
import Retry from './Retry';
import TeamList from './TeamList';

const Tab: React.FC = () => {

  const [ , setToken, , setError ] = React.useContext(AppContext);
  const [ token, error ] = useToken();

  React.useEffect(() => {
    if (!setToken) {
      return;
    }
    setToken(token);
  }, [ setToken, token ]);

  React.useEffect(() => {
    if (!setError) {
      return;
    }
    setError(error);
  }, [ setError, error ]);

  return (
    error
      ? <Retry />
      : token
        ? <TeamList />
        : <Loading />
  );

};

export default Tab;
