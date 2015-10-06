import Plugin = require('amma-plugin-loader');
let pkg = require('./package.json');
let PluginLoader = Plugin.default;
let config: Plugin.IConfig = {
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
let plugin: Plugin.IPluginLoader = new PluginLoader(config);
export = plugin;
