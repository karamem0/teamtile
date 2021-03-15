import React from 'react';
import { Grid } from '@material-ui/core';
import { Alert } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';
import AppContext from '../contexts/AppContext';

const Error: React.FC = () => {

  const [ , , error, setError ] = React.useContext(AppContext);

  return (
    <Grid
      className="grid-item"
      item
      xs={12}>
      <Alert
        content={error}
        dismissible
        icon={
          <ExclamationTriangleIcon />
        }
        variables={{ urgent: true }}
        onVisibleChange={() => {
          if (!setError) {
            return;
          }
          setError(undefined);
        }} />
    </Grid>
  );

};

export default Error;
