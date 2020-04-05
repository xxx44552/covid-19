import React, {useEffect, useState} from 'react';
import Loader from "./loader";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [color, setColor] = useState('#808080');
  const [save, setSave] = useState([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
        .then(res => res.json())
        .then(data => {
          setCountries(data);
          setSave(data);
          setIsLoader(false);
        })
  }, []);

  function search(e) {
    e.target.value.length > 0 ? setColor('#ffffff') : setColor('#808080');
    const re = new RegExp(e.target.value, 'i');
    let data = save;
    setCountries(data.filter(f => f.country.match(re)))
  }

  return (
        <>
        {
          isLoader ?
              <Loader/>
              :
              <div className='countries' style={!isLoader ? {"overflowY": "scroll"}: null} >
               <div className='search'>
                 <svg enableBackground="new 0 0 500 500" height="30px" id="Layer_1" version="1.1" viewBox="0 0 500 500" width="30px" ><path clipRule="evenodd" d="M306.39,154.09c19.628,4.543,35.244,21.259,39.787,39.523  c1.551,8.54,8.998,14.989,17.904,14.989c9.991,0,18.168-8.175,18.168-18.17c0-13.083-10.991-32.98-25.985-47.881  c-14.719-14.537-32.252-24.802-46.695-24.802c-9.991,0-18.172,8.45-18.172,18.446C291.396,145.094,297.847,152.546,306.39,154.09z   M56.629,392.312c-14.09,14.08-14.09,36.979,0,51.059c14.08,14.092,36.981,14.092,50.965,0l104.392-104.303  c24.347,15.181,53.062,23.991,83.953,23.991c87.857,0,158.995-71.142,158.995-158.999c0-87.854-71.138-158.995-158.995-158.995  c-87.856,0-158.995,71.141-158.995,158.995c0,30.802,8.819,59.606,23.992,83.953L56.629,392.312z M182.371,204.06  c0-62.687,50.875-113.568,113.568-113.568s113.569,50.881,113.569,113.568c0,62.694-50.876,113.569-113.569,113.569  S182.371,266.754,182.371,204.06z" fill={color} fillRule="evenodd"/></svg>
                 <input type='text' onChange={search} placeholder='Поиск..'/>
               </div>

               {
                 countries.map(({country,cases, todayCases, deaths, todayDeaths,
                                  recovered, active, critical, casesPerOneMillion, hide},  i)=> {
                   return <div className='country' key={i}>
                     <h5>{country}</h5>
                     <div className='wrap'>
                       <span>Общее количество заболевших - {cases}</span>
                       <span>Заболевших сегодня - {todayCases}</span>
                       <span>Общее количесвто смертей - {deaths}</span>
                       <span>Смертей сегодня - {todayDeaths}</span>
                       <span>Вылечившиеся - {recovered}</span>
                       <span>Активные - {active}</span>
                       <span>Критические - {critical}</span>
                       <span>Заболевших на миллион - {casesPerOneMillion}</span>
                       <span>{hide}</span>
                     </div>
                   </div>
                 })
               }
             </div>

        }
        </>

  );
}

export default Countries;