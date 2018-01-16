import { observable, action } from 'mobx'

export default new class StatStore {
  @observable stat = null

  @action
  setStat(stat) {
    this.stat = stat
  }
}()
