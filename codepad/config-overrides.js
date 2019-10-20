const rewireDefinePlugin = require('react-app-rewire-define-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
    //do stuff with the webpack config...

    config = rewireDefinePlugin(config, env, {
        'process.env': JSON.stringify(process.env)
    })

    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            languages: ['json', 'javascript', 'typescript']
        })
    );

    return config;
}