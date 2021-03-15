import React from 'react';
import { Grid } from '@material-ui/core';
import { Loader } from '@fluentui/react-northstar';

const Loading: React.FC = () => {

  return (
    <Grid
      className="grid-item"
      item
      xs={12}>
      <Loader label="Loading..." />
    </Grid>
  );

};

export default Loading;
