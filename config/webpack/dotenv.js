const Dotenv = require('dotenv-webpack')

module.exports = (config) => {
  config
    .plugin('envVars')
    .use(Dotenv)
}
