export function getShopifyDomain() {
    if (window.myshopifyDomain) {
        return `https://${window.myshopifyDomain}`;
    }
    if (window.Shopify && window.Shopify.shop) {
        return `https://${window.Shopify.shop}`;
    }
    console.error('Missing myshopify domain for Bold Subscriptions Javascript library. To resolve this issue define the window variable myshopifyDomain before executing this code.');

    return null;
}

export function getShopifyHandleFromDomain(myshopifyDomain) {
    if (myshopifyDomain) {
        return myshopifyDomain.replace('.myshopify.com', '');
    }
}
