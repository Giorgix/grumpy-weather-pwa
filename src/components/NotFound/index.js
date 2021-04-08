import React from 'react';
import { ErrorText } from '../';
const NotFound = (text) => {
  const MyComp = () => (
    <div>
      <ErrorText error={text} />
    </div>
  );
  MyComp.displayName = 'not-found';
  return MyComp;
};

export default NotFound;
