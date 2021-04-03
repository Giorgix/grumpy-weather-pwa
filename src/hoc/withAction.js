import {curry} from 'ramda';
import React, {useEffect} from 'react';

export default curry((action, thunk, thunkData, BaseComponent) => props => {

  useEffect(() => {
    console.log(props)
    if (thunk && thunkData) {
      const newThunk = thunk(props[thunkData])
      props.dispatcher(newThunk);
    } else {
      props.dispatcher(action);
    }
  }, [])

  return <BaseComponent {...props} />;
})