import React from 'react';
import { curry, merge }from 'ramda';
import { useSelector } from 'react-redux';

const withStoreState = curry(
    (selectorName, dataName, BaseComponent) => props => {
            const data = useSelector(selectorName);

            return <BaseComponent {...merge(props, {[dataName]: data})} />;
        }
);

export default withStoreState;
