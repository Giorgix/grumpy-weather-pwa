import {curry, is, map, path} from 'ramda';

const {entries} = Object;
const {random, trunc} = Math;

export const isFunction = is(Function);

export const mapKeys = curry((f, o) => {
  return entries(o).reduce((mapped, [key, value]) => {
    return {...mapped, [f(key)]: value};
  }, {});
});

export const projection = curry((descriptor, obj) => {
  return map(getter => {
    return isFunction(getter) ? getter(obj) : path(getter.split('.'), obj);
  }, descriptor);
});

export const randomNumber = (min, max) => {
  return trunc(random() * (max - min) + min);
};

export const delay = t => new Promise(resolve => setTimeout(resolve, t));
