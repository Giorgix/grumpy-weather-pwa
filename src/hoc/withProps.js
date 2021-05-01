import React from 'react';
import { curry, merge } from 'ramda';

const HOC = curry((propsToAdd, BaseComponent) => {
  const MyComp = (props) => {
    return <BaseComponent {...merge(props, propsToAdd)} />;
  };
  MyComp.displayName = 'with-props';
  return MyComp;
});

export default HOC;
