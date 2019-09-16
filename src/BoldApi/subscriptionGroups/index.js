import { getShopifyDomain, getBoldSubscriptionsHostname } from '../../helpers';

/**
 * @param groupId
 */
function getGroupInfo(groupId) {
    return fetch(
        `https://${getBoldSubscriptionsHostname()}/api/widget/group/${groupId}.json?shop=${getShopifyDomain()}&ts=${Date.now()}`,
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
    getGroupInfo,
};
