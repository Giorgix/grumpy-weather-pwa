import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { curry } from 'ramda';

const toList = curry((options, BaseComponent) => {
  const MyComp = ({ items, keys }) => {
    console.log('LIST ITEMS: ', items);
    const { className } = options;

    return (
      <List className={className}>
        {items.map((data, i) => {
          const k = String(data[keys] || i);
          return (
            <ListItem key={k}>
              <BaseComponent {...data} />
            </ListItem>
          );
        })}
      </List>
    );
  };

  MyComp.displayName = 'to-list';
  MyComp.propTypes = {
    items: PropTypes.array,
    keys: PropTypes.string,
  };
  return MyComp;
});

export default toList;
