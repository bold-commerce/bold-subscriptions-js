import { getShopifyDomain, getShopifyHandleFromDomain } from '../helpers';
import { default as I } from '../Validator';
import { removeProductDescriptionsFromCart } from '../helpers';

export function goToCheckout(e) {
    let result = I.expectClickEventWithinForm('goToCheckout', e);
    if (result instanceof Error) {
        throw result;
    }

    const target = e.currentTarget;
    const form = target.form;

    fetch(
        `https://${getShopifyDomain()}/cart.json?ts=${Date.now()}`,
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

            form.action = `https://recurringcheckout.com/s/${getShopifyHandleFromDomain(myshopifyDomain)}/checkout/recurring?shop_url=${myshopifyDomain}`;
            form.method = 'POST';
            form.enctype = 'multipart/form-data';

            form.appendChild(cartEl);
            form.submit();
        });
}

export function goToCheckoutCashier(e) {
    let result = I.expectClickEventWithinForm('goToCheckout', e);
    if (result instanceof Error) {
        throw result;
    }

    fetch(
        `https://${getShopifyDomain()}/cart.json?ts=${Date.now()}`,
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
