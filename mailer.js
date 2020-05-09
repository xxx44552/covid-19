const nodemailer = require('nodemailer');
const config = require('./config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});

function compare(today, yesterday, reverse) {
  if(today > yesterday) {
    return `<span style="${reverse ? 'color: green' : 'color: red'}"> + ${today - yesterday}</span>`
  }else if(today < yesterday) {
    return `<span style="${reverse ? 'color: red' : 'color: green'}"> - ${yesterday - today}</span>`
  }else {
    return '';
  }
}

function sendMailToSubscriber(email, text, global, yesterday) {
  var yesterdayGlobal = JSON.parse(yesterday.globalData);
  var yesterdayCountry = JSON.parse(yesterday.countryData);
  const link = `https://covid.webinme.ru/unsubscribe/${email}`;

  const websiteLink = `
   <table style="display: block;width: 100%;max-width: 600px;">
     <tbody>
       <tr>
         <td style="text-align: right">
            <a href="https://covid.webinme.ru">Ссылка на сайт</a> 
        </td>
      </tr>
    </tbody>
  </table>`;

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
              <td>${global.cases} ${compare(global.cases, yesterdayGlobal.cases)}</td>
            </tr>
            <tr>
              <td>Умершие</td>
              <td>${global.deaths} ${compare(global.deaths, yesterdayGlobal.deaths)}</td>
            </tr>
            <tr>
              <td>Вылечились</td>
              <td>${global.recovered} ${compare(global.recovered, yesterdayGlobal.recovered, true)}</td>
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
            <td>${cases} ${compare(cases, yesterdayData[0].cases)}</td>
          </tr>
          <tr>
            <td>Заболевших сегодня</td>
            <td>${todayCases} ${compare(todayCases, yesterdayData[0].todayCases)}</td>
          </tr>
          <tr>
            <td>Общее количество смертей</td>
            <td>${deaths} ${compare(deaths, yesterdayData[0].deaths)}</td>
          </tr>
          <tr>
            <td>Смертей сегодня</td>
            <td>${todayDeaths} ${compare(todayDeaths, yesterdayData[0].todayDeaths)}</td>
          </tr>
          <tr>
            <td>Вылечившиеся</td>
            <td>${recovered} ${compare(recovered, yesterdayData[0].recovered, true)}</td>
          </tr>
          <tr>
            <td>Активные</td>
            <td>${active} ${compare(active, yesterdayData[0].active)}</td>
          </tr>
          <tr>
            <td>Критические</td>
            <td>${critical} ${compare(critical, yesterdayData[0].critical)}</td>
          </tr>
          <tr>
            <td>Заболевших на миллион</td>
            <td>${casesPerOneMillion} ${compare(casesPerOneMillion, yesterdayData[0].casesPerOneMillion)}</td>
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
    html: descr + websiteLink + globalData + data + unsubscribe
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
