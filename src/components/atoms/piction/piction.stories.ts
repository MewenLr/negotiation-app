import { storiesOf } from '@storybook/vue'
import Piction from '@/components/atoms/piction/piction.vue'
import config from '@/components/atoms/piction/piction.dataset'

const { props } = config

storiesOf('Atoms', module).add('Piction', () => ({
  components: { Piction },
  data: () => ({
    alt: props.alt,
    source: props.source,
    placeholder: props.placeholder,
  }),
  template: `<piction
    :alt="alt"
    :source="source"
    :placeholder="placeholder"
  />`,
}))
