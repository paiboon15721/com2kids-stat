import { observable, action } from 'mobx'

export default new class UiStore {
  @observable showMobileNav = false

  @action.bound
  openMobileNav() {
    this.showMobileNav = true
  }

  @action.bound
  closeMobileNav() {
    console.log('test')
    this.showMobileNav = false
  }
}()
