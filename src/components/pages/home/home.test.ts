import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import mockAxios from '@/__mocks__/axios'
import flushPromises from 'flush-promises'
import ModTab from '@/store/modules/mod-tab'
import Home from '@/components/pages/home/home.vue'
import ModAlertMsg from '@/store/modules/mod-alert-msg'
import config from '@/components/pages/home/home.dataset'

const propsData = config.props
const localVue = createLocalVue()

localVue.use(Vuex)

describe('[Home]', () => {

  let store: Store<object>

  const { data, axios } = config

  beforeEach(() => {

    store = new Vuex.Store({
      modules: {
        ModTab: {
          namespaced: true,
          actions: ModTab.actions,
        },
        ModAlertMsg: {
          namespaced: true,
          actions: ModAlertMsg.actions,
        },
      },
    })

    store.dispatch = jest.fn()

    jest.clearAllMocks()
    mockAxios.get.mockResolvedValue({ data: null })
  })

  describe('Computed', () => {

    it('compTemp: should convert kelvin to celsius', () => {
      const wrapper = shallowMount(Home, { propsData, store, localVue }) as any
      expect(wrapper.vm.compTemp).toEqual(Math.round((data.temp - 273.15) * 100) / 100)
    })
  })

  describe('Lifecyle', () => {

    it('mounted:', async () => {
      mockAxios.get.mockResolvedValue({ data: axios.forecast })
      const wrapper = shallowMount(Home, { propsData }) as any
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get).toHaveBeenCalledWith(`forecast?q=London&APPID=${process.env.API_KEY}`)
      await flushPromises()
      expect(wrapper.vm.temp).toEqual(axios.forecast.list[0].main.temp)
      expect(wrapper.vm.city).toEqual(axios.forecast.city.name)
    })
  })

  describe('Methods', () => {

    it('checkEstimation: should trigger actAlertMsg', async () => {
      const wrapper = shallowMount(Home, { propsData, store, localVue }) as any
      wrapper.setData({ demand: data.demand })
      wrapper.vm.checkEstimation()
      await wrapper.vm.$nextTick()
      expect(store.dispatch).toHaveBeenCalledWith(
        'ModAlertMsg/actAlertMsg',
        { msg: 'Waiting for employer to estimate', type: 'info' },
      )
    })

    it('checkForm: should set demand or offer and trigger checkEstimation', async () => {
      const checkEstimation = jest.fn()
      const wrapper = shallowMount(Home, {
        propsData, store, localVue, methods: { checkEstimation },
      }) as any
      wrapper.vm.checkForm({ offer: data.offer })
      expect(wrapper.vm.offer).toEqual(data.offer)
      expect(checkEstimation).toHaveBeenCalledTimes(1)
    })

    it('toggleTab: should trigger actTabActive', async () => {
      const wrapper = shallowMount(Home, { propsData, store, localVue }) as any
      wrapper.vm.toggleTab(data.tab)
      await wrapper.vm.$nextTick()
      expect(store.dispatch).toHaveBeenCalledWith(
        'ModTab/actTabActive',
        data.tab,
      )
    })
  })
})
