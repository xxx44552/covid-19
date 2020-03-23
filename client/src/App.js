import React from 'react';
import Global from "./global";
import Countries from "./countries";
import Nav from "./nav";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import Start from "./start";

function App() {

  return (
    <BrowserRouter>
      <div className='app' >
        <header>
          <h1>Статистика по COVID-19</h1>
        </header>
        <main className="content">
          <Route exact={true} path='/global' component={Global}/>
          <Route exact={true} path='/countries' component={Countries}/>
          <Route exact={true} path='/' component={Start}/>
        </main>
        <footer>
          <Nav/>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
