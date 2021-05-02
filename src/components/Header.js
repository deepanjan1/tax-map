import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        margin: theme.spacing(1),
    },
  }));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.appBar}>
                <Typography variant="h4" className={classes.title}>Tax Map</Typography>
            </AppBar>
        </div>
    );
}
