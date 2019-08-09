class Validator {
    static expectOptions(caller, options, expectedOptions, asProperties = false) {
        const difference = expectedOptions.filter(x => asProperties
            ? !options.properties || typeof options.properties[x] === 'undefined'
            : !Object.keys(options).includes(x)
        );
        if (difference.length > 0) {
            return new Error(`Missing expected options for function ${caller}: ${JSON.stringify(
                asProperties
                    ? difference.map(x => `properties.${x}`)
                    : difference
            )}`);
        }
        return true;
    }

    static expectShopifyOptions(caller, options) {
        if (Object.keys(options).includes('id')) {
            return true;
        }

        return new Error(`Missing expected options for function ${caller}: ${JSON.stringify(['id'])}`);
    }

    static expectClickEventWithinForm(caller ,e) {
        const target = e.target;

        if (e.type !== 'click' || !target.form) {
            return new Error(`${caller} should be bound as a click event on a button contained within a form.`);
        }

        return true;
    }

    static expectFormData(caller, formData, expectedFormData, asProperties = false) {
        if (asProperties) {
            expectedFormData = expectedFormData.map(x => `properties[${x}]`);
        }

        const keys = Array.from(formData.keys());
        const difference = expectedFormData.filter(
            x => !keys.includes(x)
        );

        if (difference.length > 0) {
            return new Error(`Missing expected form data for function ${caller}: ${JSON.stringify(difference)}`);
        }
        return true;
    }

    static expectShopifyFormData(caller, formData) {
        if (!formData.has('id')) {
            return new Error(`Missing expected form data for function ${caller}: ${JSON.stringify(['id'])}`);
        }
        return true;
    }
}

export default Validator;
