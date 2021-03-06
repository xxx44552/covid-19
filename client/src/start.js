import React, {useEffect, useState} from "react";
import Subscribe from "./subscribe";
import Loader from "./loader";
import earth from './img/earth.svg';
import lib from './lib';

function Start() {

  const [data, setData] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
        .then(res => res.json())
        .then(data => {
          setData(data.map(el => el.country).filter(lib.ignore).sort());
          setIsLoader(false)
        })
  }, []);

 return (
     <>
       {
         isLoader ?
           <Loader/>
           :
           <div className='start'>
             <p className='text'>
               Текущее мировое состояние
               <span className='subtitle'>Данные обновляются каждые 3 минуты</span>
             </p>
             <h5>Подписаться на ежедневную рассылку статистики</h5>
             <Subscribe data={data}/>
             <img className='earth' src={earth} alt='Земля'/>
           </div>
       }
     </>

 )
}

export default Start;