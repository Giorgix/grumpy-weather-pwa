import React from 'react';
import { curry, merge } from 'ramda';
import { useSelector } from 'react-redux';

const withStoreState = curry((selectorName, dataName, BaseComponent) => {
  const MyComp = (props) => {
    const data = useSelector(selectorName);

    return <BaseComponent {...merge(props, { [dataName]: data })} />;
  };
  MyComp.displayName = 'with-store-state';
  return MyComp;
});

export default withStoreState;
