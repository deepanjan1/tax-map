import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getIncomeTaxesForAllStates } from '../utils/apis';
import { buildColors, formatter } from '../utils/utilities';
import USAMap from "react-usa-map";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        flexGrow: 1,
    },
  }));

export default function Map({ filing, grossIncome }) {
    const classes = useStyles();

    const [response, setResponse] = React.useState(null);
    const [snackBarInfo, setSnackbarInfo] = React.useState({
        key: null,
        fica: formatter.format(Math.round(null)),
        federal: formatter.format(Math.round(null)),
        state: formatter.format(Math.round(null)),
        blendedRate: 0,
    });
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        const getAllTaxes = async() => await getIncomeTaxesForAllStates(filing, grossIncome)
            // create color template
            .then(result => buildColors(result))

            // set to response object
            .then((data) => setResponse(data))

        getAllTaxes();
    }, [filing, grossIncome])

    const { key, fica, federal, state, blendedRate } = snackBarInfo;

    const mapHandler = (event) => {
        console.log(event.target.dataset.name);
      };
    
      
    const statesCustomConfig = () => {
        var customConfig = {};
        if (response != null) {
            // console.log("is this happening?")
            // console.log(response);
            Object.keys(response).forEach(key => {
                customConfig[key] = {
                    fill: response[key]['color']['amount'],
                    clickHandler: (event) => {
                        setSnackbarInfo({
                            key: key,
                            fica: response[key]['fica']['amount'],
                            federal: response[key]['federal']['amount'],
                            state: response[key]['state']['amount'],
                            blendedRate: Math.round(response[key]['blendedRate']['amount']*10000 / 100),
                        })
                        setOpen(true);
                    }
                    // clickHandler: (event) => console.log(`${key} clicked. Blended Tax Rate is ${
                    //     Math.round(response[key]['blendedRate']['amount']*10000) / 100
                    // }%.`)
                }
            })
        }
        return customConfig
    };

    return (
        <div className={classes.root}>
            <Grid container direction="column" align="center">
                <Grid item>
                    <Paper 
                        elevation={0}
                        className={classes.paper}
                        variant="outlined"
                        >
                        <Typography variant='h6'>{key} Rates</Typography>
                        <Typography>FICA: {fica}</Typography>
                        <Typography>Federal Tax: {federal}</Typography>
                        <Typography>State Tax: {state}</Typography>
                        <Typography>Blended Tax Rate: {blendedRate}%</Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <USAMap 
                        customize={statesCustomConfig()} 
                        onClick={mapHandler} 
                        />
                </Grid>
                {/* <Grid item>
                    { JSON.stringify(response) }
                </Grid> */}
            </Grid>
        </div>
    );
}
