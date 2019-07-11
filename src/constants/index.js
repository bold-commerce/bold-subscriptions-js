export const STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS = [
    'group_id',
    'frequency_num',
    'frequency_type',
    'frequency_type_text',
];
export const STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS = [
    'group_id',
    'frequency_num',
    'frequency_type',
    'frequency_type_text',
    'quantities[]',
    'variant_id[]',
    'product_id[]',
];
export const LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS = [
    ...STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS,
    'total_recurrences',
];
export const LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS = [
    ...STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS,
    'total_recurrences',
];
export const PREPAID_SUBSCRIPTION_EXPECTED_OPTIONS = [
    ...LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS,
    'is_prepaid',
    'prepaid_length_id',
];
export const PREPAID_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS = [
    ...LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS,
    'is_prepaid',
    'prepaid_length_id',
];
