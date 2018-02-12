import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import queryString from 'query-string'
import toInteger from 'lodash/toInteger'
import { baseUrl } from '../helpers/config'

export default new class SchoolStore {
  pageSize = 10
  @observable
  q = {
    province: '',
    limit: 10,
    skip: 0,
    comLess: '',
  }
  @observable loading = false
  @observable schools = []
  @observable totalCount = 0
  @observable currentPage = 0
  @observable schoolProvinces = []

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
    this.q.skip = this.q.limit * this.currentPage
    const qStr = queryString.stringify(this.q)
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
    this.q.province = province
  }
}()
