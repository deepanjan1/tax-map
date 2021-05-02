import { render, screen } from '@testing-library/react';
import App from './App';
import { getIncomeTaxesForOneState, getIncomeTaxesForAllStates } from './utils/apis';

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
        expect(data).toStrictEqual(
          {
            "PA": {
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
