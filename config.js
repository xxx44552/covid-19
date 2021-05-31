const config = {
  port: 1919,
  user: process.env.googleEmail,
  pass: process.env.googleEmailPassword,
  dbUser: process.env.covidUser,
  dbPassword: process.env.covidPassword,
  dbHost: process.env.covidHost,

};

module.exports = config;
