import { getBoldSubscriptionsHostname } from './index';

test('getBoldSubscriptionsHostname passes with window variable defined', () => {
    const stagingHostname = 'ro.staging.boldapps.net';

    window.BoldSubscriptionsBaseUrl = `https://${stagingHostname}`;
    const hostname = getBoldSubscriptionsHostname();

    expect(hostname).toBe(stagingHostname);
});

test('getBoldSubscriptionsHostname return default hostname without window variable defined', () => {
    delete window.BoldSubscriptionsBaseUrl;
    const hostname = getBoldSubscriptionsHostname();

    expect(hostname).toBe('ro.boldapps.net');
});
