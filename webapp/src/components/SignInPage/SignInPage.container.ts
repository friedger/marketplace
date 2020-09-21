import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './SignInPage.types'
import SignInPage from './SignInPage'
import { getWallet } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/reducer'

const mapState = (state: RootState): MapStateProps => {
  const wallet = getWallet(state)
  return { wallet: wallet }
}
const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: (path: string) => dispatch(push(path)),
})

export default connect(mapState, mapDispatch)(SignInPage)
