import { default as I } from '../../Validator';
import { STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS, STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS } from '../../constants';
import { getShopifyDomain, getShopifyHandleFromDomain } from '../../helpers';

export async function addToCart(options) {
    const passes =
        I.expectOptions(this, options, STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS, true) &&
        I.expectShopifyOptions();

    if (passes) {
        return fetch(`${getShopifyDomain()}/cart/add`, {
            method: 'POST',
            mode: 'cores',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        });
    }

    throw new Error('Bad Data');
}

export async function addToCartCashier(options) {
    return addToCart(options);
}

export function directlyToCheckout(e, expectedFormData = STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS) {
    if (I.expectClickEventWithinForm(e)) {
        e.preventDefault();

        const target = e.currentTarget;
        const form = target.form;
        const formData = new FormData(form);

        const passes = I.expectFormData(this, formData, expectedFormData);
        if (passes) {
            const myshopifyDomain = getShopifyDomain();
            form.action = `https://recurringcheckout.com/s/${getShopifyHandleFromDomain(myshopifyDomain)}/checkout/recurring_product?shop_url=${myshopifyDomain}`;
            form.method = 'POST';
            form.enctype = 'multipart/form-data';
            form.submit();
        }
    }
}

export function directlyToCheckoutCashier() {
    // TODO: Implement directlyToCheckoutCashier()
}
