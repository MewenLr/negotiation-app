<template>
  <div class="example">
    <piction
      source="example.jpg"
      class="example__image"
      placeholder="placeholder.png"
    />
    <h1 class="example__title">Example Component</h1>
    <p class="example__prop">{{ msg }}</p>
    <p class="example__computed">{{ compMsg }}</p>
    <p class="example__state" :test-attribute="`${stUrlExample}`">{{ stUrlExample }}</p>
    <div
      class="example__list"
      v-for="user in list"
      :key="user.name"
    >
      Name : {{ user.name }} | Age : {{ user.age}} |
      <span class="example__list_method">Name and Age : {{ fullName(user) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { TUserExample } from '@/scripts/contracts/types'
import { Component, Prop, Vue } from 'vue-property-decorator'
import Piction from '@/components/atoms/piction/piction.vue'

const ModExample = namespace('ModExample')

@Component({
  name: 'Example',
  components: { Piction },
})

export default class Example extends Vue {

  // Props
  @Prop({ default: 'primary' }) private msg!: string

  // MapStates
  @ModExample.State
  public stUrlExample!: string

  // Data
  private newUser: TUserExample | null = null
  private list: object[] = [
    {
      name: 'Preetish',
      age: '26',
    },
    {
      name: 'John',
      age: '30',
    },
  ]

  // Computed
  get compMsg(): string {
    return `computed ${this.msg.split(' ')[1]}`
  }

  // Hooks
  async mounted() {
    this.newUser = { name: 'patrick', age: '50' }
  }

  // Methods
  public fullName(user: TUserExample): string {
    return `${user.name}-${user.age}`
  }

}
</script>

<style lang="scss">
.example {

  &__image {
    width: auto;
    height: 150px;
  }

  &__blogs {
    margin-top: 40px;
  }
}
</style>
