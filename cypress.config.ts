const {defineConfig} = require('cypress');

module.exports = defineConfig({
    video: true,
    videoCompression: true,

    reporter: 'cypress-mochawesome-reporter',

    reporterOptions: {
        embeddedScreenshots: false,
        inlineAssets: false,
        ignoreVideos: false,
        videoOnFailOnly: true,
        saveAllAttempts: true,
        quiet: false,
        debug: false,
        charts: true // Pie chart ratio success/fail
    },

    e2e: {
        viewportWidth: 1366,
        viewportHeight: 960,
        testIsolation: false,

        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        }
    }
});
