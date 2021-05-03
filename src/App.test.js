import { render, screen } from '@testing-library/react';
import App from './App';
import { getIncomeTaxesForOneState, getIncomeTaxesForAllStates, getBlendedTaxRate } from './utils/apis';
import { testTotalTaxData } from './testConstants';
import { buildColors } from './utils/utilities';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('calls Taxee API and pulls NY state taxes for $100,000 gross income and married', () => {
    return getIncomeTaxesForOneState('married', 100000, 'NY').then((data) => {
        expect(data).toStrictEqual(
          {
            "annual": {
                "fica": {
                    "amount": 7650
                },
                "federal": {
                    "amount": 8629
                },
                "state": {
                    "amount": 4734.18
                }
            }
        });
    })
}); 


test('calls Taxee API and pulls *all* state taxes for $100,000 gross income and married', () => {
    // for now pulling PA state to test format, will look at all states in subsequent script //
    return getIncomeTaxesForAllStates('married', 100000).then((data) => {
        expect(data['PA']).toStrictEqual(
          {
            "fica": {
                "amount": 7650
            },
            "federal": {
                "amount": 8629
            },
            "state": {
                "amount": 3070
            },
            "blendedRate": {
                "amount": 0.19349
            }
        });
    })
});

test('calls Taxee API and amends blended tax rate at 100,000 in gross income', () => {
    var taxData = {
        "fica": {
            "amount": 7650
        },
        "federal": {
            "amount": 8629
        },
        "state": {
            "amount": 3070
        }
    };

    // for now pulling PA state to test format, will look at all states in subsequent script //
    expect(getBlendedTaxRate(taxData, 100000)).toStrictEqual(
        {
        "fica": {
            "amount": 7650
        },
        "federal": {
            "amount": 8629
        },
        "state": {
            "amount": 3070
        },
        "blendedRate": {
            "amount": 0.19349
        }
    });
});

test('sort blendedRate data into an array that includes state and rate', () => {
    // for now pulling PA state to test format, will look at all states in subsequent script //
    expect(buildColors(testTotalTaxData)).toStrictEqual(
        {
            AL: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4545 },
              blendedRate: { amount: 0.20824 },
              color: { amount: '#f3903f' }
            },
            AK: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: null },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            },
            AZ: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 2114.17 },
              blendedRate: { amount: 0.18393169999999998 },
              color: { amount: '#fdc70c' }
            },
            AR: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 5681.74 },
              blendedRate: { amount: 0.21960739999999998 },
              color: { amount: '#ed683c' }
            },
            CA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3141.98 },
              blendedRate: { amount: 0.1942098 },
              color: { amount: '#fdc70c' }
            },
            CO: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4630 },
              blendedRate: { amount: 0.20909 },
              color: { amount: '#f3903f' }
            },
            CT: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4600 },
              blendedRate: { amount: 0.20879 },
              color: { amount: '#f3903f' }
            },
            DE: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 5154.5 },
              blendedRate: { amount: 0.214335 },
              color: { amount: '#ed683c' }
            },
            DC: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4792 },
              blendedRate: { amount: 0.21071 },
              color: { amount: '#f3903f' }
            },
            FL: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: null },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            },
            GA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 5380 },
              blendedRate: { amount: 0.21659 },
              color: { amount: '#ed683c' }
            },
            HI: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 6395.6 },
              blendedRate: { amount: 0.22674599999999998 },
              color: { amount: '#ed683c' }
            },
            ID: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4744.19 },
              blendedRate: { amount: 0.2102319 },
              color: { amount: '#f3903f' }
            },
            IL: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4950 },
              blendedRate: { amount: 0.21229 },
              color: { amount: '#ed683c' }
            },
            IN: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3230 },
              blendedRate: { amount: 0.19509 },
              color: { amount: '#fdc70c' }
            },
            IA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 6628.63 },
              blendedRate: { amount: 0.2290763 },
              color: { amount: '#e93e3a' }
            },
            KS: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4357.5 },
              blendedRate: { amount: 0.206365 },
              color: { amount: '#f3903f' }
            },
            KY: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4867.5 },
              blendedRate: { amount: 0.211465 },
              color: { amount: '#f3903f' }
            },
            ME: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4722.45 },
              blendedRate: { amount: 0.21001450000000002 },
              color: { amount: '#f3903f' }
            },
            LA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3500 },
              blendedRate: { amount: 0.19779 },
              color: { amount: '#f3903f' }
            },
            MD: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4481.38 },
              blendedRate: { amount: 0.2076038 },
              color: { amount: '#f3903f' }
            },
            MA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 5100 },
              blendedRate: { amount: 0.21379 },
              color: { amount: '#ed683c' }
            },
            MI: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4250 },
              blendedRate: { amount: 0.20529 },
              color: { amount: '#f3903f' }
            },
            MN: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4658.13 },
              blendedRate: { amount: 0.2093713 },
              color: { amount: '#f3903f' }
            },
            MS: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4620 },
              blendedRate: { amount: 0.20899 },
              color: { amount: '#f3903f' }
            },
            MO: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4236.78 },
              blendedRate: { amount: 0.2051578 },
              color: { amount: '#f3903f' }
            },
            MT: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 5697.86 },
              blendedRate: { amount: 0.2197686 },
              color: { amount: '#ed683c' }
            },
            NV: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: null },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            },
            NE: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4170.63 },
              blendedRate: { amount: 0.20449630000000002 },
              color: { amount: '#f3903f' }
            },
            NJ: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 2750 },
              blendedRate: { amount: 0.19029 },
              color: { amount: '#fdc70c' }
            },
            NH: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4760 },
              blendedRate: { amount: 0.21039 },
              color: { amount: '#f3903f' }
            },
            NM: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3296.4 },
              blendedRate: { amount: 0.195754 },
              color: { amount: '#f3903f' }
            },
            NY: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4734.18 },
              blendedRate: { amount: 0.2101318 },
              color: { amount: '#f3903f' }
            },
            NC: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4399.2 },
              blendedRate: { amount: 0.206782 },
              color: { amount: '#f3903f' }
            },
            ND: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 1432.29 },
              blendedRate: { amount: 0.17711290000000002 },
              color: { amount: '#fff33b' }
            },
            OH: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 2911.41 },
              blendedRate: { amount: 0.1919041 },
              color: { amount: '#fdc70c' }
            },
            OR: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 8114.95 },
              blendedRate: { amount: 0.2439395 },
              color: { amount: '#e93e3a' }
            },
            OK: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4010 },
              blendedRate: { amount: 0.20289 },
              color: { amount: '#f3903f' }
            },
            PA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3070 },
              blendedRate: { amount: 0.19349 },
              color: { amount: '#fdc70c' }
            },
            RI: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3293.25 },
              blendedRate: { amount: 0.1957225 },
              color: { amount: '#f3903f' }
            },
            SC: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4759 },
              blendedRate: { amount: 0.21038 },
              color: { amount: '#f3903f' }
            },
            SD: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: null },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            },
            TN: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 0 },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            },
            TX: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: null },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            },
            VT: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3708.5 },
              blendedRate: { amount: 0.199875 },
              color: { amount: '#f3903f' }
            },
            UT: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 3722.4 },
              blendedRate: { amount: 0.20001400000000003 },
              color: { amount: '#f3903f' }
            },
            WA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: null },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            },
            WV: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 5375 },
              blendedRate: { amount: 0.21654 },
              color: { amount: '#ed683c' }
            },
            VA: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4975 },
              blendedRate: { amount: 0.21254 },
              color: { amount: '#ed683c' }
            },
            WI: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: 4944.17 },
              blendedRate: { amount: 0.2122317 },
              color: { amount: '#ed683c' }
            },
            WY: {
              fica: { amount: 7650 },
              federal: { amount: 8629 },
              state: { amount: null },
              blendedRate: { amount: 0.16279 },
              color: { amount: '#fff33b' }
            }
          }
    );
});
