import { getShopifyDomain } from '../../helpers';

/**
 * @param groupId
 * @param {?number=} bid
 */
export function getSlots(groupId, bid = null) {
    fetch(
        `https://ro.boldapps.net/api/widget/group/${groupId}/build_a_box/slots?shop=${getShopifyDomain()}${bid?`&bid=${bid}`:''}&ts=${Date.now()}`,
        {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
        }
    )
        .then(data => data.json());
}
}
