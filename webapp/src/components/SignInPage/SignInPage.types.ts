import { CallHistoryMethodAction } from 'connected-react-router'
import { Dispatch } from 'react'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'

export type Props = {
  wallet: Wallet | null
  onNavigate: (path: string) => void
}
export type MapStateProps = Pick<Props, 'wallet'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
export type MapDispatchProps = Pick<Props, 'onNavigate'>
