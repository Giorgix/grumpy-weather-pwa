import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Spinner() {
  return (
    <div data-testid="skeleton">
      <Skeleton animation="wave" variant="rect" height={340} />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" width="60%" />
    </div>
  );
}
