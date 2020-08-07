<template>
  <div class="home">
    <piction
      class="home__img-bkgrd"
      source="skyscraper.jpg"
      placeholder="placeholder.png"
    />
    <h1 class="home__title">
      Negotiation App
    </h1>
    <div class="home__card">
      <button class="home__tab">
        <svg-icon
          type="brown"
          icon="employer"
          class="home__icon"
        />
        <br />
        Employer
      </button>
      <button class="home__tab">
        <svg-icon
          type="brown"
          icon="employee"
          class="home__icon"
        />
        <br />
        Employee
      </button>
      <div class="home__form"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import config from '@/components/pages/home/home.dataset'
import Piction from '@/components/atoms/piction/piction.vue'
import SvgIcon from '@/components/atoms/svg-icon/svg-icon.vue'

@Component({
  name: 'Home',
  components: {
    Piction,
    SvgIcon,
  },
})

export default class Home extends Vue {

  private card = config.data.card

}
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: relative;

  &__img-bkgrd {
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: absolute;
  }

  &__title {
    top: 10%;
    left: 50%;
    color: $dim-white;
    position: absolute;
    font-size: $title-m;
    transform: translate(-50%, -75%);
    text-shadow: 0 0 7px $stern-brown;
  }

  &__card {
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 60%;
    height: 65%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    position: absolute;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    background-color: rgba($dim-white, .7);
  }

  &__tab {
    width: 50%;
    // height: 50px;
    padding: 10px;
    cursor: pointer;
    border: 1px solid $dim-white;
    transition: all .2s ease-in-out;
    background-color: rgba($dim-white, .3);

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
  }

  &__icon {
    width: 2rem;
    height: 2rem;
  }

  &__form {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>
