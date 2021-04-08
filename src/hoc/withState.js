import React, { useState } from 'react';
import { curry, merge } from 'ramda';
import { isFunction } from '../utils';

const withState = curry((stateName, stateHandlerName, initialValue, BaseComponent) => {
  const MyComp = (props) => {
    const initialState = isFunction(initialValue) ? initialValue(props) : initialValue;

    const [state, handlerState] = useState(initialState);

    const handler = {
      [stateName]: state,
      [stateHandlerName]: (f) => () => handlerState(f(state)),
    };

    return <BaseComponent {...merge(props, handler)} />;
  };
  MyComp.displayName = 'with-state';
  return MyComp;
});

export default withState;
