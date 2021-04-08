import { curry } from 'ramda';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../utils';
const WithActionHoc = curry((action, thunk, thunkData, optimizer, BaseComponent) => {
  const MyComp = (props) => {
    const effectOptimizer = optimizer ? optimizer : props[thunkData] ? [props[thunkData]] : [];
    useEffect(() => {
      console.log(props);
      if (thunk && thunkData) {
        const newThunk = thunk(isFunction(thunkData) ? thunkData(props) : props[thunkData]);
        props.dispatcher(newThunk);
      } else {
        props.dispatcher(action);
      }
    }, effectOptimizer);

    return <BaseComponent {...props} />;
  };
  MyComp.displayName = 'with-action-effect';
  MyComp.propTypes = {
    dispatcher: PropTypes.func,
  }
  return MyComp;
});

export default WithActionHoc;
