import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import theme from '../../theme';

const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(2)
  },
  title: {
    fontSize: 14,
  },
});

function Alert(props) {
  const classes = useStyles();
  return <MuiAlert className={classes.root} {...props} />;
}

export default function ErrorText({error}) {
  return <Alert severity="error">{error}</Alert>;
}
