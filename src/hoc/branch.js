import React from 'react';
import { curry } from 'ramda';

const BranchHOC = curry((condition, Left, Right) => {
  const MyComp = (props) => (condition(props) ? <Left {...props} /> : <Right {...props} />);
  MyComp.displayName = 'branch';
  return MyComp;
});
export default BranchHOC;