import {
  WearableCategory,
  WearableRarity,
  WearableGender,
} from '../../../nft/wearable/types'
import { ContractName } from '../ContractService'

export type NFTsFetchFilters = {
  isLand?: boolean
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableRarities?: WearableRarity[]
  wearableGenders?: WearableGender[]
  contracts?: ContractName[]
}

export type OpenRiffNFTData = { description?: string }

export type NFTTransaction = {
  tx_id: string
  tx_status: string
  tx_type: string
  sender_address: string
  contract_call: {
    contract_id: string
    function_name: string
    function_args: { hex: string }[]
  }
  tx_result: {
    hex: string
  }
}
