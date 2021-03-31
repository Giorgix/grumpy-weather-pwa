import React from 'react'
import { Link } from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction label="Weather" icon={<HomeIcon />} component={Link} to="/" />
      <BottomNavigationAction label="Settings" icon={<SettingsIcon />} component={Link} to="/settings" />
    </BottomNavigation>
  );
}
/*export default function Nav(props) {
  const classes = useStyles();
  return (
    <nav className={classes.root}>
    <List>
      <ListItem>
        <Link className={classes.link} to="/">
          <Button variant="contained" color="primary">
          Weather
          </Button>
        </Link>
      </ListItem>
      <ListItem>
        <Link className={classes.link} to="/settings">
          <Button variant="contained" color="primary">
          Settings
          </Button>
        </Link>
      </ListItem>
    </List>
  </nav>
  )
}*/
