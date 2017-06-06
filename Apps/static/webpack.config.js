module.exports = {
    entry: "./app/app.js",
    output: {
        publicPath :"http://localhost:8080/assets/",
        path: __dirname,
        filename: "./bundle.js"
    },
    module: {
        loaders: [],
        rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
              }
            },
            { test: /\.jpg$/, use: [ "file-loader" ] },
            { test: /\.png$/, use: [ "url-loader?mimetype=image/png" ] }
          ]


    }

};