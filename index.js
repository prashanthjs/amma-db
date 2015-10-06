var Plugin = require('amma-plugin-loader');
var pkg = require('./package.json');
var PluginLoader = Plugin.default;
var config = {
    services: {
        'dbService': require('./services/db').default
    },
    routes: [],
    attributes: {
        pkg: pkg
    },
    runs: [
        '%plugins.amma-db.dbService.connectDb%'
    ]
};
var plugin = new PluginLoader(config);
module.exports = plugin;
