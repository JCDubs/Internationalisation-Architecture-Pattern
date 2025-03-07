const addressSchema = {
    type: 'object',
    properties: {
        addressLine1: { type: 'string' },
        addressLine2: { type: 'string' },
        city: { type: 'string' },
        county: { type: 'string' },
        postcode: {
            type: 'string', 
            pattern: '^(GIR ?0AA|(?:(?:[A-PR-UWYZ][0-9]{1,2}|[A-PR-UWYZ][A-HK-Y][0-9]{1,2}|[A-PR-UWYZ][0-9][A-HJKSTUW]|[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]) ?[0-9][ABD-HJLNP-UW-Z]{2}))$',
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
