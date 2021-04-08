import React from 'react';
import { curry, merge } from 'ramda';

const HOC = curry((dispatcherHook, BaseComponent) => {
  const MyComp = (props) => {
    const dispatcher = dispatcherHook();
    return <BaseComponent {...merge(props, { dispatcher })} />;
  };
  MyComp.displayName = 'with-dispatcher';
  return MyComp;
});

export default HOC;
