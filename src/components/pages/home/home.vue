<template>
  <div class="home">
    <piction
      class="home__img-bkgrd"
      source="skyscraper.jpg"
      placeholder="placeholder.png"
      alt="Illustration of a skyscraper in background"
    />
    <h1 class="home__title">
      Negotiation App
    </h1>
    <div class="home__temperature">
      {{ city }}: {{ compTemp }}°C
    </div>
    <div class="home__card">
      <tab
        type="employer"
        @clicked="toggleTab('employer')"
      >
        Employer
      </tab>
      <tab
        type="employee"
        @clicked="toggleTab('employee')"
      >
        Employee
      </tab>
      <questionnary
        @check-form="checkForm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { TEstimation } from '@/scripts/contracts/types'
import axance from '@/scripts/modules/axance'
import Tab from '@/components/molecules/tab/tab.vue'
import Piction from '@/components/atoms/piction/piction.vue'
import Questionnary from '@/components/organisms/questionnary/questionnary.vue'

const ModTab = namespace('ModTab')
const ModAlertMsg = namespace('ModAlertMsg')

@Component({
  name: 'Home',
  components: {
    Tab,
    Piction,
    Questionnary,
  },
})

export default class Home extends Vue {

  private temp = 0
  private city = ''
  private offer: number | null = null
  private demand: number | null = null

  get compTemp(): number {
    return Math.round((this.temp - 273.15) * 100) / 100
  }

  async mounted(): Promise<void> {
    const { data } = await axance.get(`forecast?q=London&APPID=${process.env.API_KEY}`)
    this.temp = data?.list?.[0]?.main?.temp
    this.city = data?.city?.name
  }

  @ModAlertMsg.Action
  public actAlertMsg!: (payload: { msg: string; type: string }) => void

  @ModTab.Action
  public actTabActive!: (payload: string) => void

  public checkEstimation(): void {
    /* eslint-disable-next-line */
    if (!this.demand && !this.offer) { /* do nothing */ }
    else if (this.demand && !this.offer) this.actAlertMsg({ msg: 'Waiting for employer to estimate', type: 'info' })
    else if (!this.demand && this.offer) this.actAlertMsg({ msg: 'Waiting for employee to estimate', type: 'info' })
    else if (this.demand && this.offer) {
      if (this.demand <= this.offer) this.actAlertMsg({ msg: 'Success, you meet an agreement', type: 'success' })
      else this.actAlertMsg({ msg: 'Failure, you disagree on the price', type: 'fail' })
      this.offer = null
      this.demand = null
    }
    setTimeout(() => this.actAlertMsg({ msg: '', type: 'success' }), 2500)
  }

  public checkForm(payload: TEstimation): void {
    if (payload.demand) this.demand = payload.demand
    else if (payload.offer) this.offer = payload.offer
    this.checkEstimation()
  }

  public toggleTab(tab: string): void {
    this.actTabActive(tab)
  }

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
    width: 100%;
    color: $dim-white;
    position: absolute;
    text-align: center;
    font-size: $title-s;
    transform: translate(-50%, -75%);
    text-shadow: 0 0 7px $stern-brown;
  }

  &__temperature {
    top: 5px;
    right: 10px;
    position: absolute;
  }

  &__card {
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 90%;
    height: 65%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    max-width: 800px;
    max-height: 600px;
    position: absolute;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    background-color: rgba($dim-white, .7);
  }

  @include tablet {

    &__title {
      font-size: $title-m;
    }

    &__card {
      width: 75%;
    }
  }

  @include laptop {

    &__title {
      font-size: $title-l;
    }

    &__card {
      width: 60%;
    }
  }
}
</style>
