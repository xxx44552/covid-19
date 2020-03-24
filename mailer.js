const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webinme.ru@gmail.com',
    pass: '1234567vV'
  }
});

function sendMailToSubscriber(email, text, global) {
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
              <td>${global.cases}</td>
            </tr>
            <tr>
              <td>Умершие</td>
              <td>${global.deaths}</td>
            </tr>
            <tr>
              <td>Вылечились</td>
              <td>${global.recovered}</td>
            </tr>
        </tbody>
    </table>
    <br/>`;
  const data = text.map(({country,cases, todayCases, deaths, todayDeaths,
                           recovered, active, critical, casesPerOneMillion}) => {
    return `
    <table border="1" cellpadding="4" cellspacing="2">
      <tbody>
          <tr>
             <th>Страна - ${country}</th>
          </tr>
          <tr>
            <td>Общее количество заболевших</td>
            <td>${cases}</td>
          </tr>
          <tr>
            <td>Заболевших сегодня</td>
            <td>${todayCases}</td>
          </tr>
          <tr>
            <td>Общее количесвто смертности</td>
            <td>${deaths}</td>
          </tr>
          <tr>
            <td>Смертей сегодня</td>
            <td>${todayDeaths}</td>
          </tr>
          <tr>
            <td>Вылечившиеся</td>
            <td>${recovered}</td>
          </tr>
          <tr>
            <td>Активные</td>
            <td>${active}</td>
          </tr>
          <tr>
            <td>Критические</td>
            <td>${critical}</td>
          </tr>
          <tr>
            <td>Заболевших на миллион</td>
            <td>${casesPerOneMillion}</td>
          </tr>
        </tbody>
    </table><br/>`
  }).join('');

  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: `Статистика по коронавирусу на ${new Date().toLocaleString()}`,
    html: globalData + data + unsubscribe
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

module.exports = {sendMailToSubscriber, welcome, unSubscribe};
