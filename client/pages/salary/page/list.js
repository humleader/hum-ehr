import ListTable from '../components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const salary = state.salary
  const common = state.common
  return {
    salary,
    common
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
