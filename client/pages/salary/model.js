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
  editData: {}
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
    }
  },
  effects: {
    async query(params, rootState) {
      const newParams = Object.assign(
        rootState.project.getIn(['list', 'defaultParams']).toJS(),
        params
      )
      this.loading()
      const data = await axios.get('/salary/list', { params: newParams })
      this.list(data)
      this.setParams(newParams)
    },
    check(data, rootState) {
      return axios.post('/salary/check', data)
    },
    delete(data, rootState) {
      return axios.post('/salary/delete', data)
    },
    send(data, rootState) {
      return axios.post('/salary/send', data)
    },
    sendall(data, rootState) {
      return axios.post('/salary/sendall', data)
    },
    async queryById(id, rootState) {
      const data = await axios.get('/salary/getone', { params: { id } })
      this.setEditData(data)
    },
    async remove(id, rootState) {
      await axios.post(`/user/remove/${id}`)
    }
  }
}
