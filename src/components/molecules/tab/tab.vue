<template>
  <button
    class="tab"
    :class="{ 'tab--active': type === stTabActive }"
    @click="clickBtn($event)"
  >
    <svg-icon
      :type="type === stTabActive ? 'brown' : 'white'"
      class="tab__icon"
      :icon="type"
    />
    <br />
    <slot />
  </button>
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { Component, Prop, Vue } from 'vue-property-decorator'
import SvgIcon from '@/components/atoms/svg-icon/svg-icon.vue'

const ModTab = namespace('ModTab')

@Component({
  name: 'Tab',
  components: {
    SvgIcon,
  },
})

export default class Tab extends Vue {

  @Prop({ required: true }) private type!: string

  @ModTab.State
  public stTabActive!: string

  public clickBtn(event: MouseEvent | TouchEvent): void {
    if (event) event.preventDefault()
    this.$emit('clicked')
  }

}
</script>

<style lang="scss">
.tab {
  width: 50%;
  height: 18%;
  padding: 10px;
  cursor: pointer;
  color: $dim-white;
  border: 1px solid $dim-white;
  transition: all .2s ease-in-out;
  background-color: rgba($stern-brown, .3);

  &:nth-child(1) {
    border-radius: 5px 0 0 0;
  }

  &:nth-child(2) {
    border-radius: 0 5px 0 0;
  }

  &:hover {
    border: 1px solid $stern-brown;
    background-color: rgba($stern-brown, .2);
  }

  &:active {
    background-color: rgba($stern-brown, .5);
  }

  &__icon {
    width: 2rem;
    height: 2rem;
  }

  &--active {
    color: $stern-brown;
    background-color: rgba($dim-white, .3);
  }
}
</style>
