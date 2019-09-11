import { getShopifyDomain, getPrimaryDomain, getShopifyHandleFromDomain } from '../helpers';
import { default as I } from '../Validator';
import { removeProductDescriptionsFromCart } from '../helpers';
import {
    RECURRING_CART_CHECKOUT_EXPECTED_OPTIONS,
    RECURRING_CART_CHECKOUT_CASHIER_EXPECTED_OPTIONS,
    RECURRING_CART_CHECKOUT_CASHIER_OPTIONAL_PARAMS,
    APPLICATION_UUID
} from '../constants';

function recurringCartCheckout(e) {
    e.preventDefault();
    e.stopPropagation();

    let result = I.expectClickEventWithinForm('recurringCartCheckout', e);
    if (result instanceof Error) {
        throw result;
    }

    const target = e.target;
    const form = target.form;
    const formData = new FormData(form);

    result = I.expectFormData('recurringCartCheckout', formData, RECURRING_CART_CHECKOUT_EXPECTED_OPTIONS);
    if (result instanceof Error) {
        throw result;
    }

    fetch(
        `https://${getPrimaryDomain()}/cart.json?ts=${Date.now()}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        }
    )
        .then(cartObj => cartObj.json())
        .then((cartJSON) => {
            removeProductDescriptionsFromCart(cartJSON);

            const cartStr = JSON.stringify(cartJSON);
            const myshopifyDomain = getShopifyDomain();

            const cartEl = document.createElement('INPUT');
            cartEl.name = 'shopify_cart';
            cartEl.value = cartStr;
            cartEl.type = 'hidden';

            form.action = `https://recurringcheckout.com/s/${getShopifyHandleFromDomain(myshopifyDomain)}/checkout/recurring_full_cart?shop_url=${myshopifyDomain}`;
            form.method = 'POST';
            form.enctype = 'multipart/form-data';

            form.appendChild(cartEl);
            form.submit();
        });
}

function recurringCartCheckoutCashier(e) {
    e.preventDefault();
    e.stopPropagation();

    let result = I.expectClickEventWithinForm('recurringCartCheckout', e);
    if (result instanceof Error) {
        throw result;
    }

    const target = e.target;
    const form = target.form;
    const formData = new FormData(form);

    result = I.expectFormData('recurringCartCheckout', formData, RECURRING_CART_CHECKOUT_CASHIER_EXPECTED_OPTIONS);
    if (result instanceof Error) {
        throw result;
    }

    fetch(
        `https://${getPrimaryDomain()}/cart.json?ts=${Date.now()}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        }
    )
        .then(res => res.json())
        .then(cart => {
            const cartId = cart.token;
            const cartObj = JSON.stringify(cart);

            const cashierForm = document.createElement('FORM');
            cashierForm.action = `https://${getPrimaryDomain()}/apps/checkout/begin-checkout?shop=${getShopifyDomain()}`;
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

            const recurringSelectedEl = document.createElement('INPUT');
            recurringSelectedEl.name = `bold_cart_params[${APPLICATION_UUID}][recurring_selected]`;
            recurringSelectedEl.type = 'hidden';
            recurringSelectedEl.value = 1;

            document.body.appendChild(cashierForm);

            RECURRING_CART_CHECKOUT_CASHIER_EXPECTED_OPTIONS.forEach(function(requiredEl) {
                const newEl = document.createElement('INPUT');
                const existingEl = form.querySelector(`[name="${requiredEl}"]`);

                newEl.type = 'hidden';
                newEl.name = `bold_cart_params[${APPLICATION_UUID}][${requiredEl}]`;
                newEl.value = existingEl.value;
                cashierForm.appendChild(newEl);
            });

            RECURRING_CART_CHECKOUT_CASHIER_OPTIONAL_PARAMS.forEach(function(optionalEl) {
                const existingEl = form.querySelector(`[name="${optionalEl}"]`);
                if (existingEl) {
                    const newEl = document.createElement('INPUT');

                    newEl.type = 'hidden';
                    newEl.name = `bold_cart_params[${APPLICATION_UUID}][${optionalEl}]`;
                    newEl.value = existingEl.value;
                    cashierForm.appendChild(newEl);
                }
            });

            cashierForm.appendChild(cartIdEl);
            cashierForm.appendChild(cartEl);
            cashierForm.appendChild(recurringSelectedEl);

            cashierForm.submit();
        });
}

function goToCheckout(e) {
    let result = I.expectClickEventWithinForm('goToCheckout', e);
    if (result instanceof Error) {
        throw result;
    }

    const target = e.target;
    const form = target.form;

    fetch(
        `https://${getPrimaryDomain()}/cart.json?ts=${Date.now()}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        }
    )
        .then(cartObj => cartObj.json())
        .then((cartJSON) => {
            removeProductDescriptionsFromCart(cartJSON);

            const cartStr = JSON.stringify(cartJSON);
            const myshopifyDomain = getShopifyDomain();

            const cartEl = document.createElement('INPUT');
            cartEl.name = 'shopify_cart';
            cartEl.value = cartStr;
            cartEl.type = 'hidden';

            form.action = `https://recurringcheckout.com/s/${getShopifyHandleFromDomain(myshopifyDomain)}/checkout/recurring?shop_url=${myshopifyDomain}`;
            form.method = 'POST';
            form.enctype = 'multipart/form-data';

            form.appendChild(cartEl);
            form.submit();
        });
}

function goToCheckoutCashier(e) {
    let result = I.expectClickEventWithinForm('goToCheckout', e);
    if (result instanceof Error) {
        throw result;
    }

    fetch(
        `https://${getPrimaryDomain()}/cart.json?ts=${Date.now()}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        }
    )
        .then(res => res.json())
        .then(cart => {
            const cartId = cart.token;
            const cartObj = JSON.stringify(cart);

            const cashierForm = document.createElement('FORM');
            cashierForm.action = `https://${getPrimaryDomain()}/apps/checkout/begin-checkout?shop=${getShopifyDomain()}`;
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
    goToCheckout,
    goToCheckoutCashier,
    recurringCartCheckout,
    recurringCartCheckoutCashier,
};
