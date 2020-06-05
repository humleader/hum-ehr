import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const salary = state.salary
  const user = state.user
  return {
    salary,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.salary
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
