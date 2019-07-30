import * as standard from '../standard';
import * as limitedLength from '../limitedLength';

async function addToCart(options, isLimitedLength = false) {
    if (isLimitedLength) {
        return limitedLength.addToCart(options);
    }

    return standard.addToCart(options);
}

async function addToCartCashier(options, isLimitedLength = false) {
    return addToCart(options, isLimitedLength);
}

function directlyToCheckout(e, isLimitedLength = false) {
    if (isLimitedLength) {
        return limitedLength.directlyToCheckout(e);
    }

    return standard.directlyToCheckout(e);
}

function directlyToCheckoutCashier(e, isLimitedLength = false) {
    if (isLimitedLength) {
        return limitedLength.directlyToCheckoutCashier(e);
    }

    return standard.directlyToCheckoutCashier(e);
}


export {
    addToCart,
    addToCartCashier,
    directlyToCheckout,
    directlyToCheckoutCashier,
};
