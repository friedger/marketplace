import { Bid } from '../../bid/types'
import { NFT } from '../../nft/types'
import { OrderStatus } from '../../order/types'
import { Vendors } from '../types'
import { BidService as BidServiceInterface } from '../services'
import { bidAPI } from './bid/api'
import { TransactionHash } from 'web3x-es/types'

export class BidService implements BidServiceInterface<Vendors.OPEN_RIFF> {
  async fetchBySeller(seller: string) {
    const remoteBids = await bidAPI.fetchBySeller(seller)

    let bids: Bid[] = []
    for (const result of remoteBids) {
      const { nft, ...rest } = result
      bids.push({
        ...rest,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
      })
    }

    return bids
  }

  async fetchByBidder(bidder: string) {
    const remoteBids = await bidAPI.fetchByBidder(bidder)

    let bids: Bid[] = []
    for (const result of remoteBids) {
      const { nft, ...rest } = result
      bids.push({
        ...rest,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
      })
    }
    return bids
  }

  async fetchByNFT(nft: NFT, status: OrderStatus = OrderStatus.OPEN) {
    const remoteBids = await bidAPI.fetchByNFT(nft.id, status)

    let bids: Bid[] = []
    for (const result of remoteBids) {
      const { nft, ...rest } = result
      bids.push({
        ...rest,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
      })
    }
    return bids
  }

  async place(
    nft: NFT,
    price: number,
    expiresAt: number,
    fromAddress: string,
    fingerprint?: string
  ) {
    console.log({ nft, price, expiresAt, fromAddress, fingerprint })
    return Promise.reject('not yet implemented')
  }

  async accept(bid: Bid, fromAddress: string): Promise<TransactionHash> {
    console.log({ bid, fromAddress })
    return Promise.reject('not yet implemented')
  }

  async cancel(bid: Bid, fromAddress: string) {
    console.log({ bid, fromAddress })
    return Promise.reject('not yet implemented')
  }
}
