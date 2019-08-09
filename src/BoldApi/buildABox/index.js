import { getShopifyDomain } from '../../helpers';

/**
 * @param groupId
 * @param {?number=} bid
 */
function getSlots(groupId, bid = null) {
    return fetch(
        `https://ro.boldapps.net/api/widget/group/${groupId}/build_a_box/slots.json?shop=${getShopifyDomain()}${bid?`&bid=${bid}`:''}&ts=${Date.now()}`,
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
    getSlots,
};
