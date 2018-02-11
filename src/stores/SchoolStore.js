import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import queryString from 'query-string'
import toInteger from 'lodash/toInteger'
import { baseUrl } from '../helpers/config'

export default new class SchoolStore {
  q = {}
  pageSize = 10
  @observable loading = false
  @observable schools = []
  @observable totalCount = 0
  @observable currentPage = 0
  @observable schoolProvinces = []
  @observable selectedProvince = ''

  @action
  async fetchSchoolProvinces() {
    const { data } = await axios.get(`${baseUrl}/school-provinces`)
    runInAction(() => {
      this.schoolProvinces = data
    })
  }

  @action.bound
  async fetchSchools(count = 0) {
    this.loading = true
    if (count) {
      this.currentPage = 0
    }
    this.q.limit = this.pageSize
    this.q.skip = this.pageSize * this.currentPage
    const qStr = queryString.stringify(this.q)
    console.log(`${baseUrl}/schools?count=${count}&${qStr}`)
    const { data, headers } = await axios.get(
      `${baseUrl}/schools?count=${count}&${qStr}`,
    )
    runInAction(() => {
      this.schools = data
      const xTotalCount = toInteger(headers['x-total-count'])
      if (xTotalCount !== 0) {
        this.totalCount = xTotalCount
      }
      this.loading = false
    })
  }

  @action
  selectProvince(province) {
    this.selectedProvince = province
    this.q.province = province.value
  }
}()
