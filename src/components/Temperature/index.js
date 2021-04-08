import React from 'react';
import PropTypes from 'prop-types';

const Temperature = ({ degrees, unitType }) => {
  return (
    <>
      {unitType === 'metric' ? Math.round(degrees) : Math.round((degrees * 9) / 5 + 32)}{' '}
      {unitType === 'metric' ? 'ºC' : 'ºF'}
    </>
  );
};

Temperature.propTypes = {
  degrees: PropTypes.number,
  unitType: PropTypes.string,
};

export default Temperature;
