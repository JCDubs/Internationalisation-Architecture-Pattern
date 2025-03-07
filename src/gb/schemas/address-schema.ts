import { ADDRESS_CODE_REGEX } from "@constants/regex";

const addressSchema = {
    type: 'object',
    properties: {
        addressLine1: { type: 'string' },
        addressLine2: { type: 'string' },
        city: { type: 'string' },
        county: { type: 'string' },
        postcode: {
            type: 'string', 
            pattern: ADDRESS_CODE_REGEX,
        },
    },
    required: [
        'addressLine1',
        'city',
        'county',
        'postcode',
    ],
    additionalProperties: false,
};

export { addressSchema };
