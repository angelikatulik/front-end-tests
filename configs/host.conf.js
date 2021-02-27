const baseConf = require('../wdio.conf');
const merge = require('deepmerge');

baseConf.config.capabilities = [];
exports.config = baseConf.config;

exports.config = merge(baseConf.config, {
    waitforTimeout: 60000,
    maxInstances: 3,

    capabilities: [{
        maxInstances: 3,
        browserName: 'chrome',

        'goog:chromeOptions': {
            args: [
                '--headless',
                '--disable-gpu',
                '--window-size=1920,1080',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--ignore-certificate-errors'
            ],
            prefs: {
                'prompt_for_download': false,
            }
        }
    }],

    reporters: [
        ['junit', {
            outputDir: './junit-results',
            outputFileFormat: function (options) {
                return `${Date.now()}-testsuite.xml`
            }
        }]
    ],
}, { clone: false })