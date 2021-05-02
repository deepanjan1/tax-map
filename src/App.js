import './App.css';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import Form from './components/Form';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Header />
      <Container fixed>
        <Form />
        <Map />
      </Container>
    </div>
  );
}

export default App;
