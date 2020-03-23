import React, {useState} from "react";

export default function Subscribe(props) {

  const [list, setList] = useState(props.data[0]);
  const [email, setEmail] = useState(null);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const [error, setError] = useState('Err');
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const style = {
    "height": "200px",
    "overflow-y": "scroll"
  }
  function send(e) {
    e.preventDefault();
    if(error) {
      console.log('err');
      return
    }
    fetch('/subscribe', {
      method: 'post',
      body: JSON.stringify({countries: [list], email, sendGlobalInfo: checked}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res))
  }

  function emailFunc(e) {
    setEmail(e.target.value);
    if(!validateEmail(email)) {
      setError('Неверная почта')
    }else {
      setError(null)
    }
    console.log(error)
  }

  return (
      <div className='subscribe'>
        <p className='select-title'>Выберите страну</p>
        <form onSubmit={send}>
          <select onChange={e => setList(e.target.value)}>
            {props.data.map((el, i) => <option key={i}>{el}</option>)}
          </select>
          <div className='select-list-wrap'>
            <ul className='select-list'
                onClick={(e) => {
                  setShow(true);
                  e.target.focus()
                }}
                onBlur={() => setShow(false)}
                style={ show ? style : null}>
              <li className='item'>Выберите страну</li>
              {props.data.map((el, i) => {
                return <li className='item' key={i}>
                  <input type="checkbox" id={el}/>
                  <label htmlFor={el}>{el}</label>
                </li>})}
            </ul>
          </div>
          <div className='check-wrap'>
            <input type='checkbox' onChange={e => setChecked(e.target.checked)} id='all' />
            <label htmlFor='all'>Подписаться на общую статистику</label>
          </div>
          <input type='email' onChange={emailFunc} placeholder='Ваш email..'/>
          <button>Подписаться</button>
        </form>
      </div>
  )
}