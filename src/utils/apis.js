import { TAXEE_URL, STATES } from './constants';

export const getIncomeTaxesForAllStates = async (filing, grossIncome) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${ process.env.REACT_APP_TAXEE_KEY }`);
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var taxesByState = {};
    await Promise.all(STATES.map(async state => {
            const data = {
                pay_rate: grossIncome,
                filing_status: filing,
                state: state
            };
    
            var urlencoded = new URLSearchParams();
    
            urlencoded.append('pay_rate', grossIncome);
            urlencoded.append('filing_status', filing);
            urlencoded.append('state', state);
            
            // get tax data from Taxee API
            var taxData = await callTaxeeAPI(urlencoded);
            
            // append blended tax rate
            taxesByState[state] = getBlendedTaxRate(taxData['annual'], grossIncome);
        })
    );

    // console.log(taxesByState);
    return taxesByState
}

export const getIncomeTaxesForOneState = async (filing, grossIncome, state) => {
    const data = {
        pay_rate: grossIncome,
        filing_status: filing,
        state: state
    };

    // var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Bearer ${ process.env.REACT_APP_TAXEE_KEY }`);
    // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    
    urlencoded.append('pay_rate', grossIncome);
    urlencoded.append('filing_status', filing);
    urlencoded.append('state', state);

    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: urlencoded,
    //     redirect: 'follow'
    // };

    

    // var taxData = await fetch(TAXEE_URL, requestOptions)
    //     .then(response => response.json())
    //     .then(result => result)
    //     .catch(error => console.error('error', error));

    var taxData = await callTaxeeAPI(urlencoded)

    return taxData
}

export const getBlendedTaxRate = (taxData, grossIncome) => {
    var totalTaxAmount = 0;
    
    Object.keys(taxData).forEach(key => {
        if (taxData[key]['amount']) {
            totalTaxAmount += taxData[key]['amount'];
        }
    });

    taxData['blendedRate'] = {};
    taxData['blendedRate']['amount'] = totalTaxAmount/grossIncome;
    // console.log(taxData);
    return taxData
}

const callTaxeeAPI = async (urlencodedData) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${ process.env.REACT_APP_TAXEE_KEY }`);
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencodedData,
        redirect: 'follow'
    };

    

    var taxData = await fetch(TAXEE_URL, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.error('error', error));

    return taxData
}