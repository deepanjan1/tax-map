
export const buildColors = (taxData) => {
    // will take in tax data, look at blended tax rate and add a field for fill color
    
    /*
    1.  look at all blended rates and take max and min values
    2.  divide the difference between the max and min values into 5ths
    3.  each 5th will be assigned a color
    */

    var items = Object.keys(taxData).map((key) => {
        return [key, taxData[key]['blendedRate']['amount']]
    });

    items.sort((a, b) => {
        return b[1] - a[1]
    });

    // largest blendedRate
    var max = items[0][1];

    // smallest blendedRate
    var min = items[items.length - 1][1];

    // noramlize the values from 0 to 1
    var normalizedValues = items.map(item => {
        let normalizedValue = (item[1] - min) / (max - min)

        return [item[0], normalizedValue]
    });
    // console.log(normalizedValues);

    // map states to colors based on normalized values
    normalizedValues.forEach((value) => {
        if (value[1] >= 0.80) {
            taxData[value[0]] = {
                ...taxData[value[0]],
                'color': {
                    'amount': '#e93e3a'
                }
            }
        } else if (value[1] < 0.80 && value[1] >= 0.60) {
            taxData[value[0]] = {
                ...taxData[value[0]],
                'color': {
                    'amount': '#ed683c'
                }
            }
        } else if (value[1] < 0.60 && value[1] >= 0.40) {
            taxData[value[0]] = {
                ...taxData[value[0]],
                'color': {
                    'amount': '#f3903f'
                }
            }
        } else if (value[1] < 0.40 && value[1] >= 0.20) {
            taxData[value[0]] = {
                ...taxData[value[0]],
                'color': {
                    'amount': '#fdc70c'
                }
            }
        } else {
            taxData[value[0]] = {
                ...taxData[value[0]],
                'color': {
                    'amount': '#fff33b'
                }
            }
        }
    });

    // console.log(taxData);
    return taxData;
}

