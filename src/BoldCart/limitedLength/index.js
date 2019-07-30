import * as standard from '../standard';
import { LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS, LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS } from '../../constants';

async function addToCart(options) {
    return standard.addToCart(options, LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS);
}

async function addToCartCashier(options) {
    return addToCart(options);
}

function directlyToCheckout(e, expectedFormData = LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS) {
    return standard.directlyToCheckout(e, expectedFormData);
}

function directlyToCheckoutCashier(e, expectedFormData = LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS) {
    standard.directlyToCheckoutCashier(e, expectedFormData);
}

export {
    addToCart,
    addToCartCashier,
    directlyToCheckout,
    directlyToCheckoutCashier,
};
