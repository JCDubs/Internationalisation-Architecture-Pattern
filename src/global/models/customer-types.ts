import { Address } from '@models/address';

export type CustomerType = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly accountManager: string;
  readonly address: Address;
  readonly createdDateTime: Date;
  readonly updatedDateTime: Date;
};
