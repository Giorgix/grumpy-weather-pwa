import React from 'react';
import PropTypes from 'prop-types';

const DateString = ({
  date,
  prefix,
  format = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'long',
  },
  locale = 'es-ES',
  type = 'date',
}) => {
  const dateString =
    type === 'date'
      ? new Date(date).toLocaleDateString(locale, format)
      : new Date(date).toLocaleTimeString(locale, format);
  const formattedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);
  return <>{`${prefix} ${formattedDate}`}</>;
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
  type: PropTypes.string,
};

export default DateString;
