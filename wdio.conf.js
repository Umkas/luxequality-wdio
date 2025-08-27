export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.spec.js'
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

    capabilities: [{
    maxInstances: 5, // или сколько у тебя workers
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/usr/bin/google-chrome', // если указан
      args: [
        '--headless=new', // ключевой флаг для обхода user-data-dir
        '--no-sandbox', // обязательно для CI на Linux
        '--disable-gpu', // для headless
        '--disable-dev-shm-usage', // избегает проблем с /dev/shm в контейнерах
        // Если нужно профиль, добавь уникальный: '--user-data-dir=/tmp/chrome-profile-' + Math.random().toString(36).substring(7)
      ],
      prefs: {
        'profile.password_manager_leak_detection': false // уже есть у тебя
      }
    }
  }],
}
