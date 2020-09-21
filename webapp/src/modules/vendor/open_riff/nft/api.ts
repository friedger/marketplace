import { NFTsFetchParams } from '../../../nft/types'
import { ContractService } from '../ContractService'
import { NFTsFetchFilters, NFTTransaction } from './types'
import { AccountsApi } from '@stacks/blockchain-api-client'

const accountsApi: AccountsApi = new AccountsApi()

class NFTAPI {
  fetch = async (params: NFTsFetchParams, filters?: NFTsFetchFilters) => {
    const variables = this.buildFetchVariables(params, filters)
    console.log({ variables, params })
    const txs = await accountsApi.getAccountTransactions({
      principal: ContractService.contractAddresses.Monsters,
    })
    const nfts = txs.results
      .filter(
        (r: any) =>
          r.tx_type === 'contract_call' &&
          r.tx_status === 'success' &&
          r.contract_call.function_name === 'create-monster'
      )
      .map((r) => {
        return r as NFTTransaction
      })
    return nfts
  }

  async count(
    params: NFTsFetchParams,
    filters?: NFTsFetchFilters
  ): Promise<number> {
    console.log({ params, filters })
    return 1000
  }

  async fetchOne(contractAddress: string, tokenId: string) {
    console.log({ contractAddress, tokenId })
    return Promise.reject('not yet implemented')
  }

  async fetchTokenId(x: number, y: number) {
    console.log({ x, y })
    return Promise.reject('not yet implemented')
  }

  private buildFetchVariables(
    params: NFTsFetchParams,
    filters?: NFTsFetchFilters
  ) {
    return {
      ...params,
      ...filters,
      expiresAt: Date.now().toString(),
    }
  }
}

export const nftAPI = new NFTAPI()
