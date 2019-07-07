export default class Validator {
    static expectOptions(caller, options, expectedOptions, asProperties = false) {
        const difference = Object.keys(options).filter(
            x => asProperties
                ? !(expectedOptions.map(y => `properties[${y}]`).includes(x))
                : !expectedOptions.includes(x)
        );
        if (difference.length > 0) {
            console.error(`Missing expected options for function ${caller.name}: ${JSON.stringify(difference)}`);
            return false;
        }
        return true;
    }

    static expectShopifyOptions(options) {
        return Object.keys(options).includes('id');
    }

    static expectClickEventWithinForm(e) {
        const target = e.currentTarget;

        if (e.type !== 'click' || !target.form) {
            console.error(`${this.name} should be bound as a click event on a button contained within a form.`);
            return false;
        }

        return true;
    }

    static expectFormData(caller, formData, expectedFormData) {
        const difference = formData.keys().filter(
            x => !expectedFormData.includes(x)
        );
        if (difference.length > 0) {
            console.error(`Missing expected form data for function ${caller.name}: ${JSON.stringify(difference)}`);
            return false;
        }
        return true;
    }
}
