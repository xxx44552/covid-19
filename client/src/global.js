import React, {useEffect, useState} from 'react';
import Loader from "./loader";
import death from './img/death.svg';
import health from './img/heart.svg';
import sick from './img/sick.svg';

function Global() {
  const [global, setGlobal] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/all')
        .then(res => res.json())
        .then(data => {
          setGlobal([data]);
          setIsLoader(false);
        });
  }, []);

  return (
    <>
      {
        isLoader ?
          <Loader/>
          :
          global.map(({cases, deaths, recovered}, i)=> {
            return <div className='global-info' key={i}>
              <h3>Общая статистика</h3>
              <div className="global-wrap">
                <div className="item">
                  <img src={sick} alt='заболевшие'/>
                  <p className='global-text'>Заболевшие</p>
                  <p className='global-num'>{cases}</p>
                </div>
                <div className="item">
                  <img src={death} alt='умершие'/>
                  <p className='global-text'>Умершие</p>
                  <p className='global-num'>{deaths}</p>
                </div>
                <div className="item">
                  <img src={health} alt=''/>
                  <p className='global-text'>Вылечились</p>
                  <p className='global-num'>{recovered}</p>
                </div>
              </div>
            </div>
          })
      }
    </>
  );
}

export default Global;
