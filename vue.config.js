const htmlConfig = require('./config/webpack/html')
const dotenvConfig = require('./config/webpack/dotenv')
const svgIconConfig = require('./config/webpack/svg-icon')
const getWebpackConfig = require('./config/webpack/ssr')

module.exports = {
  outputDir: 'dist',
  chainWebpack: (config) => {
    const isServer = process.env.TARGET_ENV === 'server'
    const isProd = process.env.NODE_ENV === 'production'

    getWebpackConfig(config, isServer, isProd)

    htmlConfig(config)

    dotenvConfig(config)

    svgIconConfig(config)
  },
  css: { loaderOptions: { sass: { prependData: '@import "@/assets/styles/_index.scss";' } } },
}
