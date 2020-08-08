<template>
  <form
    method="post"
    class="questionnary"
    @submit="checkForm($event)"
  >

    <div
      v-show="stAlertMsg.msg"
      class="questionnary__alert-msg"
      :class="`questionnary__alert-msg--${stAlertMsg.type}`"
    >
      <svg-icon
        class="questionnary__alert-icon"
        :icon="stAlertMsg.type"
        :type="stAlertMsg.type === 'fail' ? 'white' : 'brown'"
      />
      {{ stAlertMsg.msg }}
    </div>

    <div
      class="questionnary__group"
      v-show="stTabActive === 'employer'"
    >
      <label
        for="offer"
        class="questionnary__label"
      >
        Employer offer&nbsp;:
      </label>
      <input
        id="offer"
        name="offer"
        type="number"
        v-model="offer"
        class="questionnary__input"
      >
    </div>

    <div
      class="questionnary__group"
      v-show="stTabActive === 'employee'"
    >
      <label
        for="demand"
        class="questionnary__label"
      >
        Employee demand&nbsp;:
      </label>
      <input
        id="demand"
        name="demand"
        type="number"
        v-model="demand"
        class="questionnary__input"
      >
    </div>

    <div
      class="questionnary__warning"
      v-show="warning"
    >
      <svg-icon
        type="red"
        icon="warning"
        class="questionnary__icon"
      />
      {{ warning }}
    </div>

    <input
      type="submit"
      value="Submit"
      class="questionnary__submit"
    >
  </form>
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import SvgIcon from '@/components/atoms/svg-icon/svg-icon.vue'

const ModTab = namespace('ModTab')
const ModAlertMsg = namespace('ModAlertMsg')

@Component({
  name: 'Questionnary',
  components: {
    SvgIcon,
  },
})

export default class Questionnary extends Vue {

  private warning: string | null = null
  private offer: number | string | null = null
  private demand: number | string | null = null

  @ModAlertMsg.State
  public stAlertMsg!: string

  @ModTab.State
  public stTabActive!: string

  public checkForm(event: MouseEvent | TouchEvent): void {
    event.preventDefault()

    this.offer = this.offer ? +this.offer : null
    this.demand = this.demand ? +this.demand : null

    if (typeof this.offer === 'number' || typeof this.demand === 'number') {
      let payload
      if (this.stTabActive === 'employee') payload = { demand: this.demand }
      else payload = { offer: this.offer }
      this.$emit('check-form', payload)
    } else {
      this.warning = 'The estimation must be a number.'
      setTimeout(() => this.warning = '', 2000)
    }

    this.offer = null
    this.demand = null
  }

}
</script>

<style lang="scss">
.questionnary {
  width: 100%;
  height: 82%;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__alert-msg {
    top: 5%;
    width: 80%;
    padding: 10px;
    display: flex;
    border-radius: 5px;
    position: absolute;
    align-items: center;

    &--fail {
      color: $dim-white;
      background-color: rgba($red, .7);
    }

    &--info {
      background-color: rgba($sand-yellow, .8);
    }

    &--success {
      background-color: rgba($faded-green, .8);
    }

  }

  &__alert-icon {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 5px;
  }

  &__group {
    display: flex;
    flex-direction: column;
  }

  &__submit {
    border: none;
    cursor: pointer;
    margin-top: 25px;
    padding: 8px 12px;
    color: $dim-white;
    border-radius: 5px;
    background-color: $stern-brown;
    transition: all .1s ease-in-out;

    &:hover {
      color: $stern-brown;
      background-color: $dim-white;
    }
  }

  &__warning {
    color: $red;
    margin-top: 5px;
    font-size: 1.4rem;
  }

  &__icon {
    width: 1.4rem;
    height: 1.4rem;
  }

  @include tablet {

    &__alert-msg {
      top: 10%;
      padding: 15px;
    }
  }
}
</style>
