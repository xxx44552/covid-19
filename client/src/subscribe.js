import React, {useState} from "react";

export default function Subscribe(props) {

  const [list, setList] = useState([]);
  const [email, setEmail] = useState(null);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [show, setShow] = useState(false);
  const [success ,setSuccess] = useState(false);
  const [emptyList, setEmptyList] = useState(false);

  const style = {
    "height": "200px",
    "overflowY": "scroll"
  }
  function send(e) {
    e.preventDefault();
    console.log(list);

    setShowError(true);

    if(error) return;

    if(!email) {
      setError('Введите почту')
    }else {
      !validateEmail(email) ? setError('Неверная почта') : setError(null);
    }

    if(list.length === 0) {
      setEmptyList(true);
      return;
    }else {
      setEmptyList(false);
    }

    fetch('/subscribe', {
      method: 'post',
      body: JSON.stringify({countries: list, email}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json()).then(data => {
      if(data.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      }
    })
  }

  function emailFunc(e) {
    setEmail(e.target.value);
    !validateEmail(email) ? setError('Неверная почта') : setError(null);
  }

  function checkCountry(e) {
    e.preventDefault();
    let arr = list;
    if(e.target.previousSibling.checked) {
      e.target.previousSibling.checked = false;
      setList(arr.filter(del => del !== e.target.innerHTML));
    } else {
      e.target.previousSibling.checked = true;
      if(arr.includes(e.target.innerHTML)) return;
      const country = e.target.innerHTML;
      const newArr = [...arr, country];
      setList(newArr);
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
              <li className='item' style={emptyList ? {"color": "red"} : null}>{list.length !== 0 ? list.map(title => <span key={title} className='country-title'>{title}&nbsp;</span>)  : 'Выберите страну'}</li>
              {props.data.map((el, i) => {
                return <li className='item' key={i}>
                  <input type="checkbox" id={el}/>
                  <label onClick={checkCountry} htmlFor={el}>{el}</label>
                </li>})}
            </ul>
          </div>
          <div className="email-wrap">
            { error && showError ? <p className='email-error'>{error}</p> : null}
            <input type='email' onChange={emailFunc} placeholder='Ваш email..'/>
          </div>
          {
            success ?
                <p className='success'>Успешно подписались</p>
                :
                <button>Подписаться</button>
          }
        </form>
      </div>
  )
}