import * as limitedLength from '../limitedLength';
import { PREPAID_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS, PREPAID_SUBSCRIPTION_EXPECTED_OPTIONS } from '../../constants';

export function directlyToCheckout(e) {
    return limitedLength.directlyToCheckout(e, PREPAID_SUBSCRIPTION_CHECKOUT_EXPECTED_OPTIONS);
}

export function directlyToCheckoutCashier(e) {
    return limitedLength.directlyToCheckoutCashier(e, PREPAID_SUBSCRIPTION_EXPECTED_OPTIONS);
}
