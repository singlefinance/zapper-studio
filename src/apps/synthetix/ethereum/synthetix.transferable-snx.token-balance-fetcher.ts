import { Inject } from '@nestjs/common';

import { Register } from '~app-toolkit/decorators';
import { PositionBalanceFetcher } from '~position/position-balance-fetcher.interface';
import { AppTokenPositionBalance } from '~position/position-balance.interface';
import { Network } from '~types/network.interface';

import { SynthetixTrasnferrableSnxTokenBalanceHelper } from '../helpers/synthetix.transferable-snx.token-balance-helper';
import { SYNTHETIX_DEFINITION } from '../synthetix.definition';

const appId = SYNTHETIX_DEFINITION.id;
const groupId = SYNTHETIX_DEFINITION.groups.transferableSnx.id;
const network = Network.ETHEREUM_MAINNET;

@Register.TokenPositionBalanceFetcher({ appId, groupId, network })
export class EthereumSynthetixTransferableSnxBalanceFetcher implements PositionBalanceFetcher<AppTokenPositionBalance> {
  constructor(
    @Inject(SynthetixTrasnferrableSnxTokenBalanceHelper)
    private readonly tokenBalanceHelper: SynthetixTrasnferrableSnxTokenBalanceHelper,
  ) {}

  async getBalances(address: string) {
    return this.tokenBalanceHelper.getBalances({ address, network });
  }
}
