import { observable, action } from 'mobx'

export default new class UiStore {
  @observable showMobileNav = false
  @observable currentPath = '/'

  @action.bound
  openMobileNav() {
    this.showMobileNav = true
  }

  @action.bound
  closeMobileNav() {
    this.showMobileNav = false
  }

  @action.bound
  changePath(path) {
    this.currentPath = path
    this.closeMobileNav()
  }
}()
