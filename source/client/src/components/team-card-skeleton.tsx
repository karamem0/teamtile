//
// Copyright (c) 2021 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/teamtile/blob/master/LICENSE
//

// React
import React from 'react';
// Fluent UI
import { Card, Skeleton } from '@fluentui/react-northstar';

export const TeamCardSkeleton = (): React.ReactElement | null => {

  return (
    <Skeleton animation="wave">
      <Card
        className="card"
        fluid
        role="listitem">
        <div className="card-column">
          <div className="card-column-item">
            <Skeleton.Avatar size="larger" />
          </div>
          <div className="card-column-item">
            <div className="card-row">
              <div className="card-skelton">
                <Skeleton.Line width="50%" />
              </div>
              <div className="card-skelton">
                <Skeleton.Line />
              </div>
              <div className="card-skelton">
                <Skeleton.Line />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Skeleton>
  );

};
