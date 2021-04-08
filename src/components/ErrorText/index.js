import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import theme from '../../theme';

const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 14,
  },
});

function Alert(props) {
  const classes = useStyles();
  return <MuiAlert className={classes.root} {...props} />;
}

const ErrorText = ({ error }) => {
  return <Alert severity="error">{error}</Alert>;
};

ErrorText.propTypes = {
  error: PropTypes.string,
};

export default ErrorText;
