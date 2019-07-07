import { default as I } from '../../Validator';
import * as standard from '../standard';
import { LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS, LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS } from '../../constants';

export async function addToCart(options) {
    const passes = I.expectOptions(this, options, LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS, true);
    if (passes) {
        return standard.addToCart(options);
    }

    throw new Error('Bad Data');
}

export async function addToCartCashier(options) {
    return addToCart(options);
}

export function directlyToCheckout(e, expectedFormData = LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS) {
    return standard.directlyToCheckout(e, expectedFormData);
}

export function directlyToCheckoutCashier() {
    // TODO: Implement directlyToCheckoutCashier()
}
