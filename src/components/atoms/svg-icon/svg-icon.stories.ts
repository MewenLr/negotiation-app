import { storiesOf } from '@storybook/vue'
import svgIconContext from '@/scripts/utils/svg-icon-context'
import SvgIcon from '@/components/atoms/svg-icon/svg-icon.vue'
import config from '@/components/atoms/svg-icon/svg-icon.dataset'

const { props } = config

svgIconContext()

storiesOf('Atoms', module).add('SvgIcon', () => ({
  components: { SvgIcon },
  data: () => ({
    icon: props.icon,
    type: props.type,
  }),
  template: `<svg-icon
    :icon="icon"
    :type="type"
  />`,
}))
