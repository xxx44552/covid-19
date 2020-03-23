const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webinme.ru@gmail.com',
    pass: '1234567vV'
  }
});

function sendMailToSubscriber(email, text) {

  const data = text.map(({country,cases, todayCases, deaths, todayDeaths,
                           recovered, active, critical, casesPerOneMillion}) => {
    return `<table border="1" cellpadding="4" cellspacing="2">
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
    </table>`
  }).join('');

  const mailOptions = {
    from: 'nodejs',
    to: email,
    subject: `Статистика по коронавирусу на ${new Date().toLocaleString()}`,
    html: data
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log(info)
    }
  });
}

module.exports = {sendMailToSubscriber};
