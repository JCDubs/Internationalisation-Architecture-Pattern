import { AddressDTO } from "@dto/address-dto";

export type CustomerDTO = {
  id?: string;
  name: string;
  email: string;
  address: AddressDTO;
  accountManager: string;
  createdDateTime?: string;
  updatedDateTime?: string;
};
