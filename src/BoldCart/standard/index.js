import { default as I } from '../../Validator';
import { STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS, STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS } from '../../constants';
import { getShopifyDomain, getShopifyHandleFromDomain } from '../../helpers';

export async function addToCart(options) {
    let result = I.expectOptions('addToCart', options, STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS, true);
    if (result instanceof Error) {
        throw result;
    }
    result = I.expectShopifyOptions('addToCart', options);
    if (result instanceof Error) {
        throw result;
    }

    return fetch(`${getShopifyDomain()}/cart/add.js`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    });
}

export async function addToCartCashier(options) {
    return addToCart(options);
}

export function directlyToCheckout(e, expectedFormData = STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS) {
    let result = I.expectClickEventWithinForm('directlyToCheckout', e);
    if (result instanceof Error) {
        throw result;
    }

    e.preventDefault();

    const target = e.currentTarget;
    const form = target.form;
    const formData = new FormData(form);

    result = I.expectFormData('directlyToCheckout', formData, expectedFormData);
    if (result instanceof Error) {
        throw result;
    }

    const myshopifyDomain = getShopifyDomain();
    form.action = `https://recurringcheckout.com/s/${getShopifyHandleFromDomain(myshopifyDomain)}/checkout/recurring_product?shop_url=${myshopifyDomain}`;
    form.method = 'POST';
    form.enctype = 'multipart/form-data';
    form.submit();
}

export function directlyToCheckoutCashier() {
    // TODO: Implement directlyToCheckoutCashier()
}
