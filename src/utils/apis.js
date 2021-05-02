import { TAXEE_URL } from './constants';
import axios from 'axios';

// const getIncomeTaxesForAllStates = (filing, grossIncome) => {

// }

export const getIncomeTaxesForOneState = async (filing, grossIncome, state) => {
    axios.defaults.headers.common['Authorization'] = process.env.TAXEE_KEY;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // let result = {}

    // await axios.post(TAXEE_URL, {
    //     pay_rate: grossIncome,
    //     filing_status: filing,
    //     state: state
    // }
    // )
    // .then((response) => console.log(response))
    // .catch((error) => console.error(error));

    const data = {
        pay_rate: grossIncome,
        filing_status: filing,
        state: state
    };

    // console.log({data});

    // console.log(TAXEE_URL);
    // console.log(process.env.REACT_APP_TAXEE_KEY);


    // const response = await fetch(TAXEE_URL, {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     withCredentials: true,
    //     credentials: 'include',
    //     headers: {
    //         'Authorization': `Bearer ${ process.env.REACT_APP_TAXEE_KEY }`,
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: JSON.stringify(data)
    // })

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${ process.env.REACT_APP_TAXEE_KEY }`);
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    
    urlencoded.append('pay_rate', grossIncome);
    urlencoded.append('filing_status', filing);
    urlencoded.append('state', state);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    

    var taxData = await fetch(TAXEE_URL, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.error('error', error));

    
    return taxData
}