import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Alert,
  Button,
  Flex,
  Loader
} from '@fluentui/react-northstar';
import { ExclamationTriangleIcon, RetryIcon } from '@fluentui/react-icons-northstar';
import TokenContext from '../contexts/TokenContext';
import useToken from '../hooks/useToken';
import TeamList from './TeamList';

const Container: React.FC = () => {

  const [ token, error ] = useToken();

  return (
    <TokenContext.Provider value={token}>
      <Grid
        className="grid-container"
        container>
        {
          error
            ? (
              <React.Fragment>
                <Grid
                  className="grid-item"
                  item
                  xs={12}>
                  <Alert
                    content={error}
                    icon={
                      <ExclamationTriangleIcon />
                    }
                    variables={{ urgent: true }} />
                </Grid>
                <Grid
                  item
                  xs={12}>
                  <Flex
                    hAlign="center"
                    padding="padding.medium"
                    vAlign="center">
                    <div>
                      <Button
                        content="Retry"
                        icon={
                          <RetryIcon />
                        }
                        onClick={() => {
                          window.location.reload();
                        }} />
                    </div>
                  </Flex>
                </Grid>
              </React.Fragment>
              )
            : token
              ? <TeamList />
              : (
                <Grid
                  className="grid-item"
                  item
                  xs={12}>
                  <Loader label="Loading..." />
                </Grid>
                )
        }
      </Grid>
    </TokenContext.Provider>
  );

};

export default Container;
