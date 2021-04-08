import React from 'react';
import { curry, merge, map } from 'ramda';

const HOC = curry((handlerDescription, BaseComponent) => {
  const MyComp = (props) => {
    const handlers = map((f) => f(props), handlerDescription);
    return <BaseComponent {...merge(props, handlers)} />;
  };
  MyComp.displayName = 'with-handlers';
  return MyComp;
});

export default HOC;
