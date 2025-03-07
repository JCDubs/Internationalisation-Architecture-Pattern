import { addressSchema } from "@schemas/address-schema";

const customerSchema = {
  type: 'object',
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    address: addressSchema,
    email: {type: 'string'},
    accountManager: {type: 'string'},
    createdDateTime: {type: 'object', format: 'date-time'},
    updatedDateTime: {type: 'object', format: 'date-time'},
  },
  required: [
    'id',
    'name',
    'address',
    'email',
    'accountManager',
  ],
  additionalProperties: false,
};

export {customerSchema};
