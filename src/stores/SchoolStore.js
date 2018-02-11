import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import { baseUrl } from '../helpers/config'

export default new class SchoolStore {
  @observable schoolProvinces = []
  @observable selectedProvince = ''

  @action
  async fetchSchoolProvinces() {
    const { data } = await axios.get(`${baseUrl}/school-provinces`)
    runInAction(() => {
      this.schoolProvinces = data
    })
  }

  @action
  selectProvince(province) {
    this.selectedProvince = province
  }
}()
