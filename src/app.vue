<template>
  <div
    id="app"
    class="app"
  >
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
  },
})

export default class App extends Vue {
}
</script>

<style lang="scss">
.app {
  height: 100vh;
  overflow-x: hidden;
  width: 100vw;
}
</style>
