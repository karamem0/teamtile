import React from 'react';
import { Grid } from '@material-ui/core';
import { Button, Flex } from '@fluentui/react-northstar';
import { RetryIcon } from '@fluentui/react-icons-northstar';

const Retry: React.FC = () => {

  return (
    <Grid
      className="grid-item"
      item
      xs={12}>
      <Flex
        hAlign="center"
        vAlign="center">
        <Button
          content="Retry"
          icon={
            <RetryIcon />
          }
          onClick={() => {
            window.location.reload();
          }} />
      </Flex>
    </Grid>
  );

};

export default Retry;
