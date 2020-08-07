<template>
  <div class="piction" v-lazy-load="true" :key="source">
    <img
      class="piction__placeholder"
      v-if="placeholder"
      :src="compPlaceholder ? placeholder : require(`@/assets/images/${placeholder}`)"
    />
    <img
      class="piction__image"
      :alt="alt"
      :data-url="compSource ? source : require(`@/assets/images/${source}`)"
    />
  </div>
</template>

<script lang="ts">
import { lazyLoadDirective } from '@/scripts/directives'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Piction',
  directives: { lazyLoadDirective },
})

export default class Piction extends Vue {

  @Prop({ default: '' }) private alt!: string
  @Prop({ required: true }) private source!: string
  @Prop({ default: '' }) private placeholder!: string

  get compSource(): boolean {
    return /^http/.test(this.source)
  }

  get compPlaceholder(): boolean {
    return /^http/.test(this.placeholder)
  }

}
</script>

<style lang="scss">
.piction {
  $self: &;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition: opacity ease-in-out .2s;

  &__placeholder, &__image {
    width: 100%;
    height: 100%;
  }

  &__placeholder {
    z-index: 0;
    min-height: 75px;
    position: absolute;
  }

  &__image {
    z-index: 1;
    object-fit: cover;
    position: relative;
  }

  &--loaded {
    opacity: 1;

    #{ $self }__placeholder {
      display: none;
    }
  }
}
</style>
