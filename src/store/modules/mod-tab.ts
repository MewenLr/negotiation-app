import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ModTab extends VuexModule {

  public stTabActive = 'employer'

  @Mutation
  public mutTabActive(payload: string): void {
    this.stTabActive = payload
  }

  @Action
  public actTabActive(payload: string): void {
    this.context.commit('mutTabActive', payload)
  }

}
