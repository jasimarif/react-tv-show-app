import './App.css';
import Header from './components/Header'
import Form from './components/Form'
import View from './components/Details'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Form />
            </Route>
            <Route path="/details/:name">
              <View/>
            </Route>
          </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;
