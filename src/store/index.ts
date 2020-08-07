import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import ModTab from '@/store/modules/mod-tab'
import ModExample from '@/store/modules/mod-example'
import ModAlertMsg from '@/store/modules/mod-alert-msg'

Vue.use(Vuex)

export default (): Store<object> => {
  const store = new Vuex.Store({
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {},
    modules: {
      ModTab,
      ModExample,
      ModAlertMsg,
    },
  })

  return store
}
