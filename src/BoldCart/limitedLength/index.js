import * as standard from '../standard';
import { LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS, LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS } from '../../constants';

export async function addToCart(options) {
    return standard.addToCart(options, LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS);
}

export async function addToCartCashier(options) {
    return addToCart(options);
}

export function directlyToCheckout(e, expectedFormData = LIMITED_LENGTH_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS) {
    return standard.directlyToCheckout(e, expectedFormData);
}

export function directlyToCheckoutCashier(e, expectedFormData = LIMITED_LENGTH_SUBSCRIPTION_EXPECTED_OPTIONS) {
    standard.directlyToCheckoutCashier(e, expectedFormData);
}
