const serverless = require('serverless-webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = (async () => {
    return {
        entry: serverless.lib.entries,
        target: "node",
        mode: serverless.lib.webpack.isLocal ? "development" : "production",
        externals: [nodeExternals()],
        module: {
            rules: [{ test: /\.js$/, use: "babel-loader" }],
        },
    };
})();
