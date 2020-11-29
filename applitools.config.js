module.exports = {
    appName: 'aap-visual',
    browser: [
        {width: 1024, height: 768, name: 'chrome'},
        {width: 1920, height: 1080, name: 'firefox'}
    ],
    concurrency: 2,
    showLogs: false,
    saveDebugData: false,
    batchName: 'aap-visual local',
    failCypressOnDiff: false
}
