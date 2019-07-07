import * as limitedLength from '../limitedLength';
import { PREPAID_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS } from '../../constants';

export function directlyToCheckout(e) {
    return limitedLength.directlyToCheckout(e, PREPAID_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS);
}

export function directlyToCheckoutCashier() {
    // TODO: Implement directlyToCheckoutCashier()
}
