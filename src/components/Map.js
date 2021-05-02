import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getIncomeTaxesForOneState } from '../utils/apis';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

export default function Map() {
    const classes = useStyles();

    const [response, setResponse] = React.useState('null');

    useEffect(() => {
        const getTaxes = async () => await getIncomeTaxesForOneState('married', 100000, 'NY')
            .then((data) => setResponse(data));

        getTaxes();
    }, [])

    return (
        <div className={classes.root}>
            <Grid container direction="column">
                {/* { getIncomeTaxesForOneState('married', 100000, 'NY') } */}
                { JSON.stringify(response) }
            </Grid>
        </div>
    );
}
