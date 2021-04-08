import { curry, merge, map, complement, identity } from 'ramda';
import React, { useEffect, useState } from 'react';

const switchValues = map(complement(identity));

const HOC = curry((effect, optimizer, BaseComponent) => {
  const MyComp = (props) => {
    const status = { getting_loc: true, completed: false };
    const initialState = merge(props, status);
    const [data, changeState] = useState(initialState);
    const asyncEffect = async () => {
      await effect()
        .then(merge(switchValues(status)))
        .then(changeState);
    };
    useEffect(() => {
      asyncEffect();
    }, optimizer);

    return <BaseComponent {...merge(props, data)} />;
  };
  MyComp.displayName = 'with-async-effect';
  return MyComp;
});

export default HOC;
