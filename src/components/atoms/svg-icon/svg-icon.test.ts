import { shallowMount } from '@vue/test-utils'
import SvgIcon from '@/components/atoms/svg-icon/svg-icon.vue'
import config from '@/components/atoms/svg-icon/svg-icon.dataset'

const propsData = config.props

describe('[SvgIcon]', () => {

  const { props } = config

  describe('Props', () => {

    it('should render props types in .svg-icon class attributes', () => {
      const wrapper = shallowMount(SvgIcon, { propsData })
      const svgIcon = wrapper.find('.svg-icon')
      let classTypes = ''
      for (const type of props.type.split(' ')) classTypes += ` svg-icon--${type}`
      expect(svgIcon.attributes('class')).toEqual(`svg-icon ${classTypes.substr(1)}`)
    })

    it('should render props icon in .cta__content xlink:href attributes', () => {
      const wrapper = shallowMount(SvgIcon, { propsData })
      const content = wrapper.find('.svg-icon__content')
      expect(content.attributes('href')).toEqual(`#icon-${props.icon}`)
    })
  })
})
