<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :class="`svg-icon--${type}`"
  >
    <use
      class="svg-icon__content"
      :xlink:href="`#icon-${icon}`"
    >
    </use>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const typeValidator = ['red', 'brown', 'white']

@Component({ name: 'SvgIcon' })

export default class SvgIcon extends Vue {

  @Prop({ required: true }) private icon!: string
  @Prop({
    default: 'primary',
    validator: (prop) => typeValidator.includes(prop),
  }) private type!: string

}
</script>

<style lang="scss">
.svg-icon {
  overflow: hidden;

  &--red {
    fill: $red;
  }

  &--brown {
    fill: $stern-brown;
  }

  &--white {
    fill: $dim-white;
  }

}
</style>
