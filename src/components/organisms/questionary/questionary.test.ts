import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ModTab from '@/store/modules/mod-tab'
import ModAlertMsg from '@/store/modules/mod-alert-msg'
import config from '@/components/organisms/questionary/questionary.dataset'
import Questionary from '@/components/organisms/questionary/questionary.vue'

const propsData = config.props
const localVue = createLocalVue()

const { data } = config

localVue.use(Vuex)

describe('[Questionary]', () => {

  let store: Store<object>

  beforeEach(() => {

    store = new Vuex.Store({
      modules: {
        ModTab: {
          namespaced: true,
          state: ModTab.state,
        },
        ModAlertMsg: {
          namespaced: true,
          state: ModAlertMsg.state,
        },
      },
    })
  })

  describe('Methods', () => {

    it('checkForm: should emit input value & reset props', async () => {
      const wrapper = shallowMount(Questionary, { propsData, store, localVue }) as any
      wrapper.setData({ demand: data.demand })
      wrapper.vm.checkForm()
      expect(wrapper.emitted().checkForm[0]).toEqual([{ demand: data.demand }])
      expect(wrapper.vm.demand).toBeFalsy()
    })
  })
})
