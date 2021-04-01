import React, { useState } from 'react';
import { curry, merge }from 'ramda';
import { isFunction } from '../utils';

const withState = curry(
    (stateName, stateHandlerName, initialValue, BaseComponent) => {
        return props => {
            const initialState = isFunction(initialValue)
                ? initialValue(props)
                : initialValue;

            const [state, handlerState] = useState(initialState);

            const handler = {
                [stateName]: state,
                [stateHandlerName]: f => () => handlerState(f(state)),
            };

            return <BaseComponent {...merge(props, handler)} />;
        };
    },
);

export default withState;
