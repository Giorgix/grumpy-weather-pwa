import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  sup: {
    fontSize: '70%',
  },
  temp: {
    marginRight: '-5%',
  },
});

const Temperature = ({ degrees, unitType, showUnit = true }) => {
  const classes = useStyles();
  return (
    <>
      <span>
        {unitType === 'metric' ? Math.round(degrees) : Math.round((degrees * 9) / 5 + 32)}
        <sup className={classes.sup}>
          <small>º{showUnit && (unitType === 'metric' ? 'C' : 'F')}</small>
        </sup>
      </span>
    </>
  );
};

Temperature.propTypes = {
  degrees: PropTypes.number,
  unitType: PropTypes.string,
  showUnit: PropTypes.bool,
};

export default Temperature;
