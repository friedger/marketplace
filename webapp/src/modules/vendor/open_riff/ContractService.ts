import { ContractService as ContractServiceInterface } from '../services'
import { Network } from '../../contract/types'
import { NFTCategory } from '../../nft/types'
import { TransferType } from '../types'

const network = Network.ROPSTEN || (process.env.REACT_APP_NETWORK! as Network)

const contractAddresses = {
  [Network.ROPSTEN]: {
    Marketplace: 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market',
    Monsters: 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.monsters',
  },
  [Network.MAINNET]: {
    Marketplace: 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market',
    Monsters: 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.monsters',
  },
}[network]

const { Marketplace, Monsters } = contractAddresses

export type ContractName = keyof typeof contractAddresses

export class ContractService implements ContractServiceInterface {
  static contractAddresses = contractAddresses

  contractAddresses = contractAddresses

  contractSymbols = {
    [Marketplace]: 'Marketplace',
    [Monsters]: 'Monsters',
  } as const

  contractNames = {
    [Marketplace]: 'Marketplace',
    [Monsters]: 'Monsters',
  } as const

  contractCategories = {
    [Monsters]: NFTCategory.ART,
  } as const

  getTransferType(_address: string) {
    return TransferType.SAFE_TRANSFER_FROM
  }
}
