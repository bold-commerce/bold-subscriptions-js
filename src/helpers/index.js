import URL from 'url';

function getShopifyDomain() {
    if (window.myshopifyDomain) {
        return `${window.myshopifyDomain}`;
    }
    if (window.Shopify && window.Shopify.shop) {
        return `${window.Shopify.shop}`;
    }

    throw new Error('Missing myshopify domain for Bold Subscriptions Javascript library. To resolve this issue define the window variable myshopifyDomain before executing this code.');
}

function getPrimaryDomain() {
    if (window.primaryDomain) {
        return `${window.primaryDomain}`;
    }
    if (window.Shopify && window.Shopify.shop) {
        return `${window.location.host}`;
    }

    throw new Error('Missing primary domain for Bold Subscriptions Javascript library. To resolve this issue define the window variable primaryDomain (e.g. yourstore.com) before executing this code.');
}

function getShopifyHandleFromDomain(myshopifyDomain) {
    if (myshopifyDomain) {
        return myshopifyDomain.replace('.myshopify.com', '');
    }
}

function removeProductDescriptionsFromCart(cartJSON) {
    for (let i = 0; i < cartJSON.items.length; i++) {
        cartJSON.items[i].product_description = '';
    }
}

function getBoldSubscriptionsHostname() {
    const defaultHostname = 'ro.boldapps.net';

    if (window.BoldSubscriptionsBaseUrl) {
        try {
            console.log(window.BoldSubscriptionsBaseUrl);
            let Url = new URL.parse(window.BoldSubscriptionsBaseUrl);
            return Url.hostname;
        } catch(e) {
            console.log(e);
            console.warn(`BoldSubscriptionsBaseUrl should include a protocol. Defaulting to "https://${defaultHostname}".`);
            return defaultHostname;
        }
    }

    return defaultHostname;
}

export {
    getShopifyDomain,
    getPrimaryDomain,
    getShopifyHandleFromDomain,
    removeProductDescriptionsFromCart,
    getBoldSubscriptionsHostname,
};
