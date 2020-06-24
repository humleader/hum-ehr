import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  listSource: {},
  params: {
    pageSize: 20,
    pageIndex: 1
  },
  editData: {
    fundStatus: '',
    nationality: 1,
    maritalStatus: '',
    deductionInfo: {}
  },
  staffcode: []
})

export default {
  state: initialState,
  reducers: {
    listSource: (state, payload) => {
      return state.set('listSource', im.fromJS(payload))
    },
    setParams: (state, payload) => {
      return state.set('params', im.fromJS(payload))
    },
    setEditData: (state, payload) => {
      return state.set('editData', im.fromJS(payload))
    },
    setStaffcode: (state, payload) => {
      return state.set('staffcode', im.fromJS(payload))
    }
  },
  effects: {
    async query(params, rootState) {
      const data = await axios.get('/employee/list', { params })
      this.listSource(data)
      this.setParams(params)
      return data
    },
    save(data, rootState) {
      return axios.post('/employee/save', data)
    },
    async staffcode(id, rootState) {
      const data = await axios.get('/staffcode/get')
      this.setStaffcode(data)
    },
    async queryById(id, rootState) {
      const data = await axios.get('/employee/findone', { params: { id } })
      data.educationInfo = JSON.parse(data.educationInfo)
      data.deductionInfo = JSON.parse(data.deductionInfo)
      this.setEditData(data)
    }
  }
}
