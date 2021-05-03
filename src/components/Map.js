import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getIncomeTaxesForOneState, getIncomeTaxesForAllStates } from '../utils/apis';
import { buildColors } from '../utils/utilities';
import USAMap from "react-usa-map";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

export default function Map() {
    const classes = useStyles();

    const [response, setResponse] = React.useState(null);
    const [chartConfig, setChartConfig] = React.useState(null);

    useEffect(() => {
        const getAllTaxes = async() => await getIncomeTaxesForAllStates('married', 100000)
            // create color template
            .then(result => buildColors(result))

            // set to response object
            .then((data) => setResponse(data))

        getAllTaxes();
    }, [])

    // useEffect(() => {
    //     statesCustomConfig();
    // }, [response])

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
                    clickHandler: (event) => console.log(`${key} clicked. Blended Tax Rate is ${
                        Math.round(response[key]['blendedRate']['amount']*10000) / 100
                    }%.`)
                }
            })
        }
        return customConfig
    };

    return (
        <div className={classes.root}>
            <Grid container direction="column" align="center">
                <Grid item>
                    <USAMap customize={statesCustomConfig()} onClick={mapHandler} />
                </Grid>
                {/* <Grid item>
                    { JSON.stringify(response) }
                </Grid> */}
            </Grid>
        </div>
    );
}
