require('dotenv').config()
const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
/* eslint-disable import/no-unresolved */
const serverBundle = require('../../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const app = new Koa()
const router = new Router()

const port = process.env.SERVER_PORT || 8080

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest,
  runInNewContext: false,
})

app.use(serve(path.resolve(__dirname, '../..', 'dist')))

router.get('*', async (ctx, next) => {
  try {
    const context = { url: ctx.url }
    const html = await renderer.renderToString(context)
    await next()
    return ctx.body = html
  } catch (e) {
    if (e.code === 404) {
      ctx.status = 404
      return ctx.body = 'Page not found'
    }
    console.error(`[error] ${e}`)
    ctx.status = 500
    return ctx.body = 'Internal Server Error'
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => console.info(`[info] Server SSR is running on ${port}`))
