import ListTable from './components'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  const home = state.home
  const common = state.common
  return {
    home,
    common
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ...dispatch.home
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTable)
