// import { shallowMount, createLocalVue } from '@vue/test-utils'
// import Vuex, { Store } from 'vuex'
// import exStore from '@/store/modules/ex-store'
// import Example from '@/components/example/example.vue'
// import config from '@/components/example/example.dataset'

// const propsData = config.props
// const localVue = createLocalVue()

// localVue.use(Vuex)

// describe('[Example]', () => {

//   let store: Store<object>

//   const { data, props } = config

//   beforeEach(() => {

//     store = new Vuex.Store({
//       modules: {
//         ExStore: {
//           namespaced: true,
//           state: exStore.state,
//         },
//       },
//     })
//   })

//   describe('Props', () => {

//     it('should render props msg in .example__prop', () => {
//       const wrapper = shallowMount(Example, { propsData, store, localVue })
//       const el = wrapper.find('.example__prop')
//       expect(el.text()).toEqual(props.msg)
//     })
//   })

//   describe('States', () => {

//     it('should render state exStore/exUrl in .example__state attributes \'test-attribute\'', () => {
//       const wrapper = shallowMount(Example, { propsData, store, localVue })
//       const el = wrapper.find('.example__state')
//       expect(el.attributes('test-attribute')).toEqual(exStore.state.exUrl)
//       // use props() when Element is a Vue Component
//       // expect(state.props('test-attribute')).toEqual(exStore.state.exUrl)
//     })
//   })

//   describe('Computed', () => {

//     it('compMsg: should return concatenated prop \'msg\'', () => {
//       // 'as any' required to test method and computed
//       const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
//       expect(wrapper.vm.compMsg).toEqual(`computed ${props.msg.split(' ')[1]}`)
//     })
//   })

//   describe('Lifecyle', () => {

//     it('mounted', () => {
//       // 'as any' required to test method and computed
//       const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
//       expect(wrapper.vm.newUser).toEqual({ name: 'patrick', age: '50' })
//     })
//   })

//   describe('Methods', () => {

//     it('fullName: should return concatenated user name and age', () => {
//       // 'as any' required to test method and computed
//       const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
//       expect(wrapper.vm.fullName(data.user)).toEqual(`${data.user.name}-${data.user.age}`)
//     })
//   })
// })
