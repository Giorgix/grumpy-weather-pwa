import React from 'react';
import { curry, merge} from 'ramda';

export default curry((dispatcherHook, BaseComponent) => props => {
    const dispatcher = dispatcherHook();
    return <BaseComponent {...merge(props, {dispatcher})}  />;
});