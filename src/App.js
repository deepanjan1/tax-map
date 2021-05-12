import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import Form from './components/Form';
import Map from './components/Map';

function App() {
  
  const [filing, setFiling] = React.useState('married');
  const [grossIncome, setGrossIncome] = React.useState(100000);

  return (
    <div className="App">
      <Header />
      <Container fixed>
        <Form 
          filing={filing}
          setFiling={setFiling}
          grossIncome={grossIncome}
          setGrossIncome={setGrossIncome}
        />
        <Map 
          filing={filing}
          grossIncome={grossIncome}
        />
      </Container>
    </div>
  );
}

export default App;
