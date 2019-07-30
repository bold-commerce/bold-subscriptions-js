import { default as I } from '../../Validator';
import { STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS, STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS } from '../../constants';
import { getShopifyDomain, getShopifyHandleFromDomain } from '../../helpers';

async function addToCart(options, expectedOptions = STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS) {
    let result = I.expectOptions('addToCart', options, expectedOptions, true);
    if (result instanceof Error) {
        throw result;
    }
    result = I.expectShopifyOptions('addToCart', options);
    if (result instanceof Error) {
        throw result;
    }

    return fetch(`https://${getShopifyDomain()}/cart/add.js`, {
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

async function addToCartCashier(options) {
    return addToCart(options);
}

function directlyToCheckout(e, expectedFormData = STANDARD_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS) {
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

function directlyToCheckoutCashier(e, expectedFormData = STANDARD_SUBSCRIPTION_EXPECTED_OPTIONS) {
    expectedFormData = [
        ...expectedFormData,
        '_ro_single_product_recurring_item',
    ];

    let result = I.expectClickEventWithinForm('directlyToCheckoutCashier', e);
    if (result instanceof Error) {
        throw result;
    }

    e.preventDefault();

    const target = e.currentTarget;
    const form = target.form;
    const formData = new FormData(form);

    result = I.expectFormData('directlyToCheckoutCashier', formData, expectedFormData, true);
    if (result instanceof Error) {
        throw result;
    }

    result = I.expectShopifyFormData('directlyToCheckoutCashier', formData);
    if (result instanceof Error) {
        throw result;
    }

    fetch(
        `https://${getShopifyDomain()}/cart/clear.js`,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        }
    )
        .then(() => fetch(
            `https://${getShopifyDomain()}/cart/add.js`,
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: formData,
            }
        ))
        .then(() => fetch(
            `https://${getShopifyDomain()}/cart.json?ts=${Date.now()}`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
            }
        ))
        .then(res => res.json())
        .then(cart => {
            const cartId = cart.token;
            const cartObj = JSON.stringify(cart);

            const cashierForm = document.createElement('FORM');
            cashierForm.action = `https://${getShopifyDomain()}/apps/checkout/begin-checkout?shop=${getShopifyDomain()}`;
            cashierForm.method = 'POST';
            cashierForm.enctype = 'multipart/form-data';

            const cartIdEl = document.createElement('INPUT');
            cartIdEl.name = 'cart_id';
            cartIdEl.type = 'hidden';
            cartIdEl.value = cartId;

            const cartEl = document.createElement('INPUT');
            cartEl.name = 'cart';
            cartEl.type = 'hidden';
            cartEl.value = cartObj;

            document.body.appendChild(cashierForm);
            cashierForm.appendChild(cartIdEl);
            cashierForm.appendChild(cartEl);

            cashierForm.submit();
        });
}

export {
    addToCart,
    addToCartCashier,
    directlyToCheckout,
    directlyToCheckoutCashier,
};
