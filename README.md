# BoldSubscriptions.js

## About

Use these Javascript APIs to easily build custom subscription flows, add subscriptions to the cart and navigate to the Bold Subscriptions or Cashier checkout. The available methods are a fast alternative to and largely based off of our [Custom Subscription Flow](https://docs.boldapps.net/subscriptions/storefront#custom-subscription-flow) and [Widget API](https://docs.boldapps.net/subscriptions/storefront#widget-api) documentation. Included with these API methods are detailed exceptions and error messages to help you quickly and reliably develop custom subscription flows.

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

## Installing

Using npm:

```shell
$ npm install bold-subscriptions-js
```

Using yarn:

```shell
$ yarn add bold-subscriptions-js
```

Using CDN:

```html
<script src="https://unpkg.com/bold-subscriptions-js/dist/bold-subscriptions-js.min.js"></script>
```

## API Reference

To view our full documentation on the available methods head over to our [BoldSubscriptions.js API reference](https://docs.boldapps.net/subscriptions/storefront#boldsubscriptions-js).

### Example Node.js usage

```javascript
import { cart } from 'bold-subscriptions-js';
cart.standard.addToCart({
	'id': 1250183643165,
	properties: {
		'group_id': 1234,
		'frequency_num': 1,
		'frequency_type': 3,
		'frequency_type_text': 'Every 1 Month(s)',
	}
})
	.then(() => alert('Successfully added!'));
```


### Example CDN usage

```html
<form>
	<input type="hidden" name="group_id" value="1234">
	<input type="hidden" name="frequency_num" value="1">
	<input type="hidden" name="frequency_type" value="3">
	<input type="hidden" name="frequency_type_text" value="Every 1 Month(s)">
	<input type="hidden" name="quantities[]" value="1">
	<input type="hidden" name="variant_id[]" value="1250183643165">
	<input type="hidden" name="product_id[]" value="103180140573">
	<button onclick="BoldSubscriptions.cart.standard.directlyToCheckout(event)">Checkout</button>
</form>
```

## Contributing

This project is read only. Please contact [Bold Commerce](https://boldcommerce.com/) with any changes or additions you would like to make.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/bold-commerce/bold-subscriptions-js/blob/master/LICENSE.md) file for details.
