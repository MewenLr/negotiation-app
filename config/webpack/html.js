const path = require('path')

module.exports = (config) => {
  config
    .plugin('html')
    .tap((args) => {
      args[0].favicon = path.resolve(__dirname, '../..', 'src/assets/icons/favicon.ico')
      return args
    })
}
