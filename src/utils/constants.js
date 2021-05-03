
/*
    Calculate current year
*/

var fullDate = new Date();
var fullYear = fullDate.getFullYear();

export const STATES = [ 
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 
    'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' 
];

export const FILING_STATUS = {
    'married': 'Married',
    'single': 'Single',
    'married_separately': 'Married, Filing Separately',
    'head_of_household': 'Head of Household'
}

export const TAXEE_URL = `https://taxee.io/api/v2/calculate/${fullYear - 1}`;

export const COLOR_PALETTE = {
    
}