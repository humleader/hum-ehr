import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const employee = state.employee
  const user = state.user
  const common = state.common
  return {
    employee,
    common,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.employee,
      ...dispatch.common
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
