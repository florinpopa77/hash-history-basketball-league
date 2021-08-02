import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Players from "./Players";
import Teams from "./Teams";
import Navbar from "./Navbar";
import TeamPage from "./TeamPage";
import Articles from './Articles'


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar/>

          <Switch>
            <Route path='/' exact component={ Home }/>
            <Route path='/players' component= { Players }/>
            <Route path='/teams' component={ Teams }/>
            <Route path='/:teamId' exact component={ TeamPage }/>
            <Route path='/:teamId/articles' component={Articles} />
            <Route render={ () => <h1 className='text-center'>404 - Page not Found!</h1> }/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
