import { getShopifyDomain, getBoldSubscriptionsHostname } from '../../helpers';

/**
 * @param groupId
 * @param {?number=} bid
 */
function getTranslations() {
    return fetch(
        `https://${getBoldSubscriptionsHostname()}/api_public/translations?shop_url=${getShopifyDomain()}&ts=${Date.now()}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        }
    )
        .then(data => data.json());
}

export {
    getTranslations,
};
