import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { FILING_STATUS } from '../utils/constants';

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

export default function Form({ filing, setFiling, grossIncome, setGrossIncome}) {
    const classes = useStyles();
    // const [filing, setFiling] = React.useState('married');
    // const [grossIncome, setGrossIncome] = React.useState(0);

    const handleFilingChange = (event) => {
        setFiling(event.target.value)
    }

    const handleGrossIncome = (event) => {
        setGrossIncome(event.target.value)
    }

    const handleCalculate = () => {

    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={0} variant="outlined">
                <form>
                    <Grid 
                        container 
                        direction="row" 
                        spacing={3}
                        justify="center"
                        alignItems="center"
                        >
                        <Grid item>
                            <InputLabel id="gross-income">Gross Income</InputLabel>
                            <Input 
                            id="gross-income"
                            value={grossIncome}
                            onChange={handleGrossIncome}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel id="select-filing-label">Filing Status</InputLabel>
                            <Select 
                            labelId="select-filing-label"
                            id="select-filing"
                            value={filing}
                            onChange={handleFilingChange}
                            >
                                {
                                    Object.keys(FILING_STATUS).map((status) => 
                                        <MenuItem key={status} value={status}>{FILING_STATUS[status]}</MenuItem>
                                    )
                                }
                            </Select>
                        </Grid>
                        {/* <Grid item>
                            <Button 
                                variant='contained' 
                                color='primary'
                                onClick={handleCalculate}
                            >Calculate</Button>
                        </Grid> */}
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}
