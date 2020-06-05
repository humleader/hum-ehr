import im from 'immutable'
import axios from 'common/axios'

const getDefaultParams = () => {
  return {
    pageSize: 15,
    pageIndex: 1
  }
}

const initialState = im.fromJS({
  list: {
    loading: false,
    params: getDefaultParams(),
    defaultParams: getDefaultParams(),
    dataSource: []
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
    list: (state, payload) => {
      return state.update('list', list =>
        list.set('dataSource', im.fromJS(payload)).set('loading', false)
      )
    },
    setParams: (state, payload) => {
      return state.update('list', list =>
        list.set('params', im.fromJS(payload)).set('loading', false)
      )
    },
    loading: (state, payload) => {
      return state.update('list', list => list.set('loading', true))
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
      const newParams = Object.assign(
        rootState.candidate.getIn(['list', 'defaultParams']).toJS(),
        params
      )
      this.loading()
      const data = await axios.get('/employee/list', { params: newParams })
      this.list(data)
      this.setParams(newParams)
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
