import './App.css';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import createRecipe from './components/createRecipe';
import Details from './components/Details'

function App() {
  return (
    <div className="App">
      
      <Switch>

      <Route exact path = '/' component = {LandingPage}/>
      <Route path = '/Home'  component = {Home}/>
      <Route path = '/recipe' component = {createRecipe}/>
      <Route path = '/recipes/:id' component = {Details}/>


     

      </Switch>

    </div>
  );
}

export default App;
