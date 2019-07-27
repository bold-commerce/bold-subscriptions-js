export function getShopifyDomain() {
    if (window.myshopifyDomain) {
        return `${window.myshopifyDomain}`;
    }
    if (window.Shopify && window.Shopify.shop) {
        return `${window.Shopify.shop}`;
    }

    throw new Error('Missing myshopify domain for Bold Subscriptions Javascript library. To resolve this issue define the window variable myshopifyDomain before executing this code.');
}

export function getShopifyHandleFromDomain(myshopifyDomain) {
    if (myshopifyDomain) {
        return myshopifyDomain.replace('.myshopify.com', '');
    }
}

export function removeProductDescriptionsFromCart(cartJSON) {
    for (let i = 0; i < cartJSON.items.length; i++) {
        cartJSON.items[i].product_description = '';
    }
}
