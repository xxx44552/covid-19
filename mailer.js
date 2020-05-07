const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});

function progress(today, yesterday) {
  if(today > yesterday) {
    return `<span style="color: red"> + ${today - yesterday}</span>`
  }else if(today < yesterday) {
    return `<span style="color: green"> - ${yesterday - today}</span>`
  }else {
    return '';
  }
}

function sendMailToSubscriber(email, text, global, yesterday) {
  var yesterdayGlobal = JSON.parse(yesterday.globalData);
  var yesterdayCountry = JSON.parse(yesterday.countryData);
  const link = `https://covid.webinme.ru/unsubscribe/${email}`;
  const unsubscribe = `
   <table style="display: block;width: 100%;max-width: 600px;">
     <tbody>
       <tr>
         <td style="text-align: right">
            <a href="${link}">Отписаться от рассылки</a> 
        </td>
      </tr>
    </tbody>
  </table>`;

  const globalData = `<table border="1" cellpadding="4" cellspacing="2">
        <tbody>
            <tr><th>Общая статистика по миру</th></tr>
            <tr>
              <td>Заболевшие</td>
              <td>${global.cases} ${progress(global.cases, yesterdayGlobal.cases)}</td>
            </tr>
            <tr>
              <td>Умершие</td>
              <td>${global.deaths} ${progress(global.deaths, yesterdayGlobal.deaths)}</td>
            </tr>
            <tr>
              <td>Вылечились</td>
              <td>${global.recovered} ${progress(global.recovered, yesterdayGlobal.recovered)}</td>
            </tr>
        </tbody>
    </table>
    <br/>`;
  const data = text.map(({country,cases, todayCases, deaths, todayDeaths,
                           recovered, active, critical, casesPerOneMillion}) => {

    const yesterdayData = yesterdayCountry.filter(el => el.country === country)

    return `
    <table border="1" cellpadding="4" cellspacing="2">
      <tbody>
          <tr>
             <th>Страна - ${country}</th>
          </tr>
          <tr>
            <td>Общее количество заболевших</td>
            <td>${cases} ${progress(cases, yesterdayData[0].cases)}</td>
          </tr>
          <tr>
            <td>Заболевших сегодня</td>
            <td>${todayCases} ${progress(todayCases, yesterdayData[0].todayCases)}</td>
          </tr>
          <tr>
            <td>Общее количество смертей</td>
            <td>${deaths} ${progress(deaths, yesterdayData[0].deaths)}</td>
          </tr>
          <tr>
            <td>Смертей сегодня</td>
            <td>${todayDeaths} ${progress(todayDeaths, yesterdayData[0].todayDeaths)}</td>
          </tr>
          <tr>
            <td>Вылечившиеся</td>
            <td>${recovered} ${progress(recovered, yesterdayData[0].recovered)}</td>
          </tr>
          <tr>
            <td>Активные</td>
            <td>${active} ${progress(active, yesterdayData[0].active)}</td>
          </tr>
          <tr>
            <td>Критические</td>
            <td>${critical} ${progress(critical, yesterdayData[0].critical)}</td>
          </tr>
          <tr>
            <td>Заболевших на миллион</td>
            <td>${casesPerOneMillion} ${progress(casesPerOneMillion, yesterdayData[0].casesPerOneMillion)}</td>
          </tr>
        </tbody>
    </table><br/>`
  }).join('');

  const descr = `
    <table border="0" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
              <td>
                На <span style="color: red"> + n</span> больше или 
                <span style="color: green"> - n</span> меньше по сравнению со вчерашним днем.
              </td>
            </tr>
        </tbody>
    </table> <br/>`;

  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: `Статистика по коронавирусу на ${new Date().toLocaleString()}`,
    html: descr + globalData + data + unsubscribe
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

function welcome(email, countries) {

  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: 'Подписка на статистику по COVID-19',
    text: `Вы подписались на ежедневную рассылку статистики по коронавирусу по странам: ${countries}.`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
};

function newSubscriber(email, countries) {
  const mailOptions = {
    from: 'nodejs',
    to: 'xxx44552@gmail.com',
    subject: 'Новый подписчик на статистику по COVID-19',
    text: `Email - ${email}, страны - ${countries}.`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

function unSubscribe(email) {

  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: 'Отписка на статистику по COVID-19',
    text: `Вы успешно отписались от статистики по коронавирусу.`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

module.exports = {sendMailToSubscriber, welcome, unSubscribe, newSubscriber};
