import { getBoldSubscriptionsHostname } from './index';

test('getBoldSubscriptionsHostname passes with window variable defined', () => {
    const stagingHostname = 'ro.staging.boldapps.net';
    const stagingUrl = `https://${stagingHostname}`;

    window.BoldSubscriptionsBaseUrl = stagingUrl;
    const hostname = getBoldSubscriptionsHostname();

    console.log(hostname, stagingHostname);

    expect(hostname).toBe(stagingHostname);
});

test('getBoldSubscriptionsHostname return default hostname without window variable defined', () => {
    delete window.BoldSubscriptionsBaseUrl;
    const hostname = getBoldSubscriptionsHostname();

    expect(hostname).toBe('ro.boldapps.net');
});
