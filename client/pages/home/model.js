import im from 'immutable'
import axios from 'common/axios'

const initialState = im.fromJS({
  list: {
    loading: false,
    params: {},
    dataSource: []
  }
})

export default {
  state: initialState,
  reducers: {
    list: (state, payload) => {
      return state.update('list', list =>
        list.set('dataSource', im.fromJS(payload)).set('loading', false)
      )
    },
    loading: (state, payload) => {
      return state.update('list', list => list.set('loading', true))
    },
    setParams: (state, payload) => {
      return state.update('list', list =>
        list.set('params', im.fromJS(payload)).set('loading', false)
      )
    }
  },
  effects: {
    async query(params, rootState) {
      this.loading()
      const data = await axios.get('/candidate/getcount', { params: params })
      this.list(data)
      this.setParams(params)
    }
  }
}
