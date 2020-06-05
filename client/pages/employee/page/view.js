import DetailsView from '../components/details-view'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const employee = state.employee
  const company = state.company
  const user = state.user
  const common = state.common
  return {
    employee,
    company,
    common,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.employee,
      queryToproject: dispatch.company.queryToproject
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView)
