// import { shallowMount } from '@vue/test-utils'
// import mockAxios from '@/__mocks__/axios'
// import flushPromises from 'flush-promises'
// import Home from '@/components/pages/home/home.vue'
// import config from '@/components/pages/home/home.dataset'

// const propsData = config.props

// describe('[Home]', () => {

//   beforeEach(() => {
//     jest.clearAllMocks()
//   })

//   describe('Lifecyle', () => {

//     it('mounted:', async () => {
//       const wrapper = shallowMount(Home, { propsData }) as any
//       expect(mockAxios.get).toHaveBeenCalledTimes(1)
//       expect(mockAxios.get).toHaveBeenCalledWith(`${urls.carouselHome}?include=subcomponents`)
//       await flushPromises()
//       expect(wrapper.vm.slidesLoaded).toBeTruthy()
//     })
//   })
// })
