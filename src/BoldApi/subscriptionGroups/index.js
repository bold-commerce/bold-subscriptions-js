import { getShopifyDomain } from '../../helpers';

/**
 * @param groupId
 */
function getGroupInfo(groupId) {
    return fetch(
        `https://ro.boldapps.net/api/widget/group/${groupId}?shop=${getShopifyDomain()}&ts=${Date.now()}`,
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
