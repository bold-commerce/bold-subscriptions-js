import * as standard from '../standard';
import * as limitedLength from '../limitedLength';

export async function addToCart(options, isLimitedLength = false) {
    if (isLimitedLength) {
        return limitedLength.addToCart(options);
    }

    return standard.addToCart(options);
}

export async function addToCartCashier(options, isLimitedLength = false) {
    return addToCart(options, isLimitedLength);
}

export function directlyToCheckout(e, isLimitedLength = false) {
    if (isLimitedLength) {
        return limitedLength.directlyToCheckout(e);
    }

    return standard.directlyToCheckout(e);
}

export function directlyToCheckoutCashier(e, isLimitedLength = false) {
    if (isLimitedLength) {
        return limitedLength.directlyToCheckoutCashier(e);
    }

    return standard.directlyToCheckoutCashier(e);
}
