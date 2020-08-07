import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ModAlertMsg extends VuexModule {

  public stAlertMsg = {
    msg: '',
    type: 'success',
  }

  @Mutation
  public mutAlertMsg(payload: { msg: string; type: string }): void {
    this.stAlertMsg = payload
  }

  @Action
  public actAlertMsg(payload: { msg: string; type: string }): void {
    this.context.commit('mutAlertMsg', payload)
  }

}
