import './_main.scss'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './app.vue'
import createStore from './store'
import createRouter from './router'
import svgIcon from './scripts/utils/svg-icon-context'

Vue.config.productionTip = false

svgIcon()

export default (context: { url: string }) => {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    data: { url: context ? context.url : '' },
    router,
    store,
    render: (h) => h(App),
  })

  return { app, router, store }
}
