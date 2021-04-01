import React from 'react';
import { curry, merge, map } from 'ramda';

export default curry((handlerDescription, BaseComponent) => props => {
    const handlers = map(f => f(props), handlerDescription);
    return <BaseComponent {...merge(props, handlers)} />;
});