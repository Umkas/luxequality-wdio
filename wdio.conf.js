export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [

    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome' // or "firefox", "microsoftedge", "safari"
    }],
    baseUrl: 'https://www.saucedemo.com',
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    globals: true,
    injectGlobals: true,
}
