import { shallowMount } from '@vue/test-utils'
import Piction from '@/components/atoms/piction/piction.vue'
import config from '@/components/atoms/piction/piction.dataset'

const propsData = config.props

describe('[Piction]', () => {

  const { props } = config

  props.source = 'http://test-source.jpg'
  props.placeholder = 'http://test-placeholder.jpg'

  describe('Props :', () => {

    it('should render props alt in .piction__image alt attributes', () => {
      const wrapper = shallowMount(Piction, { propsData })
      const image = wrapper.find('.piction__image')
      expect(image.attributes('alt')).toEqual(props.alt)
    })

    it('should render props source in .piction__image src attributes', () => {
      const wrapper = shallowMount(Piction, { propsData })
      const image = wrapper.find('.piction__image')
      expect(image.attributes('src')).toEqual(props.source)
    })

    it('should render props placeholder in .piction__placeholder src attributes', () => {
      const wrapper = shallowMount(Piction, { propsData })
      const placeholder = wrapper.find('.piction__placeholder')
      expect(placeholder.attributes('src')).toEqual(props.placeholder)
    })
  })

  describe('Computed :', () => {

    it('should return true if props source is http url', () => {
      const wrapper = shallowMount(Piction, { propsData }) as any
      expect(wrapper.vm.compSource).toEqual(/^http/.test(props.source))
    })

    it('should return true if props placeholder is http url', () => {
      const wrapper = shallowMount(Piction, { propsData }) as any
      expect(wrapper.vm.compPlaceholder).toEqual(/^http/.test(props.placeholder))
    })
  })
})
