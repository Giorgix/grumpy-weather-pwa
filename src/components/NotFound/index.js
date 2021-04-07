import React from 'react';
import { ErrorText } from '../';
const NotFound = (text) => () => (
  <div>
    <ErrorText error={text} />
  </div>
);

export default NotFound;