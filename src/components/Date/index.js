import React from 'react';
import PropTypes from 'prop-types';

const DateString = ({
  date,
  prefix,
  format = {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  },
  locale = 'es-ES',
}) => {
  return <>{`${prefix} ${new Date(date).toLocaleTimeString(locale, format)}`}</>;
};

DateString.propTypes = {
  date: PropTypes.number,
  prefix: PropTypes.string,
  format: PropTypes.shape({
    hour12: PropTypes.bool,
    hour: PropTypes.string,
    minute: PropTypes.string,
    second: PropTypes.string,
  }),
  locale: PropTypes.string,
};

export default DateString;
