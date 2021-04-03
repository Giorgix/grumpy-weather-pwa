import {curry, merge} from 'ramda';
import React, {useEffect, useState} from 'react';
import {randomNumber, delay} from '../utils';

export default curry((effect, optimizer, BaseComponent) => props => {
  const status = {getting_loc: true, completed: false};
  const initialState = merge(props, status);
  const [data, changeState] = useState(initialState);
  const getLocation = async () => {
    //await delay(randomNumber(3000, 4000))
    await effect().then((data) => {console.log('GOT DATA!: ', data); return data}).then(changeState);
  }
  useEffect(() => {
    getLocation()
  }, optimizer);

  return <BaseComponent {...merge(props, data)} />;
});