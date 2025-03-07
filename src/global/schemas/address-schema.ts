import { ADDRESS_CODE_REGEX } from "@constants/regex";

const addressSchema = {
    type: 'object',
    properties: {
        addressLine1: { type: 'string' },
        addressLine2: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zipcode: {
            type: 'string',
            pattern: ADDRESS_CODE_REGEX
        },
    },
    required: [
        'addressLine1',
        'city',
        'state',
        'zipcode',
    ],
    additionalProperties: false,
};

export { addressSchema };
