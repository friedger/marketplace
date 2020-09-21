import { Address } from 'web3x-es/address'

import { ERC721 } from '../../../contracts/ERC721'
import { ContractFactory } from '../../contract/ContractFactory'
import { locations } from '../../routing/locations'
import {
  NFT,
  NFTsFetchParams,
  NFTsCountParams,
  NFTCategory,
} from '../../nft/types'
import { Order } from '../../order/types'
import { Account } from '../../account/types'
import { isExpired } from '../../order/utils'
import { NFTService as NFTServiceInterface } from '../services'
import { NFTsFetchFilters, NFTTransaction } from './nft/types'
import { Vendors } from '../types'
import { nftAPI } from './nft/api'
import { MAX_QUERY_SIZE } from './api'
import {
  cvToString,
  deserializeCV,
  UIntCV,
} from '@blockstack/stacks-transactions'

export class NFTService implements NFTServiceInterface<Vendors.OPEN_RIFF> {
  async fetch(params: NFTsFetchParams, filters?: NFTsFetchFilters) {
    const [remoteNFTs, total] = await Promise.all([
      nftAPI.fetch(params, filters),
      this.count(params, filters),
    ])

    const nfts: NFT<Vendors.OPEN_RIFF>[] = []
    const accounts: Account[] = []
    const orders: Order[] = []

    for (const remoteNFT of remoteNFTs) {
      const nft = this.toNFT(remoteNFT)
      const order = this.toOrder(remoteNFT)

      if (order && !isExpired(order.expiresAt!)) {
        nft.activeOrderId = order.id
        orders.push(order)
      }

      const address = nft.owner
      let account = accounts.find((account) => account.id === address)
      if (!account) {
        account = this.toAccount(address)
      }
      account.nftIds.push(nft.id)

      nfts.push(nft)
    }

    return [nfts, accounts, orders, total] as const
  }

  async count(countParams: NFTsCountParams, filters?: NFTsFetchFilters) {
    const params: NFTsFetchParams = {
      ...countParams,
      first: MAX_QUERY_SIZE,
      skip: 0,
    }
    return nftAPI.count(params, filters)
  }

  async fetchOne(contractAddress: string, tokenId: string) {
    const remoteNFT = await nftAPI.fetchOne(contractAddress, tokenId)

    const nft = this.toNFT(remoteNFT)
    const order = this.toOrder(remoteNFT)

    if (order && !isExpired(order.expiresAt!)) {
      nft.activeOrderId = order.id
    }

    return [nft, order] as const
  }

  async transfer(fromAddress: string, toAddress: string, nft: NFT) {
    if (!fromAddress) {
      throw new Error('Invalid address. Wallet must be connected.')
    }
    const from = Address.fromString(fromAddress)
    const to = Address.fromString(toAddress)

    const erc721 = ContractFactory.build(ERC721, nft.contractAddress)

    return erc721.methods
      .transferFrom(from, to, nft.tokenId)
      .send({ from })
      .getTxHash()
  }

  toNFT(nft: NFTTransaction): NFT<Vendors.OPEN_RIFF> {
    console.log({ nft })
    const name = cvToString(
      deserializeCV(
        Buffer.from(nft.contract_call.function_args[0].hex.substr(2), 'hex')
      )
    )
    const tokenId = (deserializeCV(
      Buffer.from(nft.tx_result.hex.substr(2), 'hex')
    ) as UIntCV).value.toNumber()
    return {
      id: nft.tx_id,
      tokenId: nft.tx_result.hex,
      contractAddress: nft.contract_call.contract_id,
      activeOrderId: '',
      owner: nft.sender_address,
      name: name,
      image: `https://speed-spend.netlify.app/monsters/monster-${
        (tokenId - 1) % 109
      }.png`,
      url: locations.nft(nft.contract_call.contract_id, nft.tx_result.hex),
      data: {
        description: 'Monster',
      },
      category: NFTCategory.ART,
      vendor: Vendors.OPEN_RIFF,
    }
  }

  toOrder(nft: NFTTransaction): Order | undefined {
    console.log({ nft })
    let order: Order | undefined

    return order
  }

  toAccount(address: string): Account {
    return {
      id: address,
      address,
      nftIds: [],
    }
  }
}
