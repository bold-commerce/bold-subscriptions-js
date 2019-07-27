import { getShopifyDomain } from '../../helpers';

/**
 * @param groupId
 */
export function getGroupInfo(groupId) {
    fetch(
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
