<template>
  <div
    id="app"
    class="app"
  >
    <!-- <example /> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Example from '@/components/example/example.vue'

@Component({
  name: 'App',
  components: {
    Example,
  },
})

export default class App extends Vue {

}
</script>

<style lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  &--veil {
    overflow: hidden;
  }
}
</style>
