import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/pages/home/home.vue'

Vue.use(VueRouter)

export default () => {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
    ],
  })

  return router
}
