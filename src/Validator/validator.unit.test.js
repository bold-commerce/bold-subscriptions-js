import {
    STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS,
    STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS
} from '../constants';
import { default as I } from './index';

test('expectOptions passes with valid options', () => {
    const options = {
        id: 1234,
        group_id: 1234,
        frequency_num: 1,
        frequency_type: 3,
        frequency_type_text: 'Every 1 Month(s)',
    };
    const result = I.expectOptions('test', options, STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS);

    expect(result).toBe(true);
});

test('expectOptions passes for options that are properties', () => {
    const options = {
        id: 1234,
        properties: {
            group_id: 1234,
            frequency_num: 1,
            frequency_type: 3,
            frequency_type_text: 'Every 1 Month(s)',
        },
    };
    const result = I.expectOptions('test', options, STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS, true);

    expect(result).toBe(true);
});

test('expectOptions fails for options that should be properties', () => {
    const options = {
        id: 1234,
        group_id: 1234,
        frequency_num: 1,
        frequency_type: 3,
        frequency_type_text: 'Every 1 Month(s)',
    };
    const result = I.expectOptions('test', options, STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS, true);

    expect(result instanceof Error).toBe(true);
});

test('expectOptions fails for missing options', () => {
    const options = {
        id: 1234,
        frequency_num: 1,
        frequency_type: 3,
        frequency_type_text: 'Every 1 Month(s)',
    };
    const result = I.expectOptions('test', options, STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS);

    expect(result instanceof Error).toBe(true);
});

test('expectShopifyOptions passes with valid options', () => {
    const options = {
        id: 123456789,
    };
    const result = I.expectShopifyOptions('test', options);

    expect(result).toBe(true);
});

test('expectShopifyOptions fails for missing options', () => {
    const options = {
        variant_id: 123456789,
    };
    const result = I.expectShopifyOptions('test', options);

    expect(result instanceof Error).toBe(true);
});

test('expectFormData passes with valid form data', () => {
    const formData = new FormData();
    formData.append('group_id', 1234);
    formData.append('frequency_num', 1);
    formData.append('frequency_type', 3);
    formData.append('frequency_type_text', 'Every 1 Month(s)');
    formData.append('quantities[]', 1);
    formData.append('variant_id[]', 12345678);
    formData.append('product_id[]', 87654321);

    const result = I.expectFormData('test', formData, STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS);

    expect(result).toBe(true);
});

test('expectFormData fails for missing form data', () => {
    const formData = new FormData();
    formData.append('frequency_type', 3);
    formData.append('frequency_type_text', 'Every 1 Month(s)');
    formData.append('quantities[]', 1);
    formData.append('variant_id[]', 12345678);
    formData.append('product_id[]', 87654321);

    const result = I.expectFormData('test', formData, STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS);

    expect(result instanceof Error).toBe(true);
});
