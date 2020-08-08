import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ModTab from '@/store/modules/mod-tab'
import Tab from '@/components/molecules/tab/tab.vue'
import config from '@/components/molecules/tab/tab.dataset'

const propsData = config.props
const localVue = createLocalVue()

localVue.use(Vuex)

describe('[Tab]', () => {

  let store: Store<object>

  beforeEach(() => {

    store = new Vuex.Store({
      modules: {
        ModTab: {
          namespaced: true,
          state: ModTab.state,
        },
      },
    })
  })

  describe('Methods', () => {

    it('clickBtn: should emit event', async () => {
      const wrapper = shallowMount(Tab, { propsData, store, localVue }) as any
      wrapper.vm.clickBtn()
      expect(wrapper.emitted().clicked).toBeTruthy()
    })
  })
})
