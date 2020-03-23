import React, {useState} from "react";

export default function Subscribe(props) {

  const [list, setList] = useState([]);
  const [email, setEmail] = useState(null);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const [error, setError] = useState('Err');
  const [show, setShow] = useState(false);
  const style = {
    "height": "200px",
    "overflowY": "scroll"
  }
  function send(e) {
    e.preventDefault();
    console.log(list);
    if(error) {
      console.log('err');
      return
    }
    fetch('/subscribe', {
      method: 'post',
      body: JSON.stringify({countries: list, email}),
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

  function checkCountry(e) {
    e.preventDefault();
    let arr = list;
    if(e.target.previousSibling.checked) {
      e.target.previousSibling.checked = false;
      setList(arr.filter(del => del !== e.target.innerHTML));
    }else {
      e.target.previousSibling.checked = true;
      if(arr.includes(e.target.innerHTML)) return;
      arr.push(e.target.innerHTML);
      setList(arr);
    }
  }

  return (
      <div className='subscribe'>
        <form onSubmit={send}>
          <div className='select-list-wrap'>
            <ul className='select-list' tabIndex='0'
                onFocus={ () => setShow(true)}
                onBlur={() => setShow(false)}
                style={ show ? style : null}>
              <li className='item'>Выберите страну</li>
              {props.data.map((el, i) => {
                return <li className='item' key={i}>
                  <input type="checkbox" id={el}/>
                  <label onClick={checkCountry} htmlFor={el}>{el}</label>
                </li>})}
            </ul>
          </div>
          <input type='email' onChange={emailFunc} placeholder='Ваш email..'/>
          <button>Подписаться</button>
        </form>
      </div>
  )
}