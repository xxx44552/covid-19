import React, {useState, useEffect} from 'react';
import Global from "./global";
import Countries from "./countries";
import Nav from "./nav";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import Start from "./start";
import Uaparser from 'ua-parser-js'

function App() {

  const [info, setInfo] = useState(null);

  useEffect(() => {
    const parser = new Uaparser();
    parser.setUA(navigator.userAgent);
    const result = parser.getResult();
    setInfo(result)
  }, [])

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
          {
            info ?
                <span className='device'>{info.device.vendor} {info.device.model}</span>
                : null
          }
        </main>
        <footer>
          <Nav/>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
