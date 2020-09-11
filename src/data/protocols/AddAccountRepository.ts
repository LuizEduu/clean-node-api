import { AddAccountModel } from '../../domain/useCases/AddAccount'
import { AccountModel } from '../../domain/models/Account'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
