const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const WebpackBar = require('webpackbar')

const CssContextLoader = require.resolve('./loaders/css-context')

const config = {
  client: {
    entry: './server/ssr/entry-client.js',
  },
  server: {
    entry: './server/ssr/entry-server.js',
  },
}

module.exports = (webpackConfig, isServer, isProd) => {

  // Remove unneeded plugins for SSR
  webpackConfig.plugins.delete('hmr')
  webpackConfig.plugins.delete('preload')
  webpackConfig.plugins.delete('prefetch')
  webpackConfig.plugins.delete('progress')
  if (!isProd) webpackConfig.plugins.delete('no-emit-on-errors')

  if (isServer) {
    webpackConfig.plugins.delete('friendly-errors')

    const isExtracting = webpackConfig.plugins.has('extract-css')
    if (isExtracting) {
      // Remove extract
      const langs = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus']
      const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
      for (const lang of langs) {
        for (const type of types) {
          const rule = webpackConfig.module.rule(lang).oneOf(type)
          rule.uses.delete('extract-css-loader')
          // Critical CSS
          rule.use('css-context').loader(CssContextLoader).before('css-loader')
        }
      }
      webpackConfig.plugins.delete('extract-css')
    }
  }

  webpackConfig.stats(isProd ? 'normal' : 'none')

  webpackConfig.entry('app').clear().add(config[isServer ? 'server' : 'client'].entry)

  // client configuration
  if (!isServer) {
    webpackConfig.plugin('ssr').use(VueSSRClientPlugin)
    webpackConfig.plugin('loader').use(WebpackBar, [{ name: 'Client', color: 'green' }])
    webpackConfig.plugin('CleanWebpack').use(CleanWebpackPlugin)

    webpackConfig.devtool(!isProd ? '#cheap-module-source-map' : undefined)

    webpackConfig.module.rule('vue').use('vue-loader').tap((options) => {
      options.optimizeSSR = false
      return options
    })

    webpackConfig.optimization
      .splitChunks({
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      })
      .runtimeChunk({ name: 'manifest' })
  // server configuration
  } else {
    webpackConfig.plugin('ssr').use(VueSSRServerPlugin)
    webpackConfig.plugin('loader').use(WebpackBar, [{ name: 'Server', color: 'orange' }])

    webpackConfig.devtool('source-map')
    webpackConfig.externals(nodeExternals({ whitelist: /\.css$/ }))
    webpackConfig.output.libraryTarget('commonjs2')
    webpackConfig.target('node')
    webpackConfig.optimization.splitChunks(false).minimize(false)

    webpackConfig.node.clear()

    if (isServer) {
      webpackConfig.module.rule('vue').use('cache-loader').tap((options) => {
        // Change cache directory for server-side
        options.cacheIdentifier += '-server'
        options.cacheDirectory += '-server'
        return options
      })
    }

    webpackConfig.module.rule('vue').use('vue-loader').tap((options) => {
      if (isServer) {
        options.cacheIdentifier += '-server'
        options.cacheDirectory += '-server'
      }
      options.optimizeSSR = isServer
      return options
    })
  }
}
