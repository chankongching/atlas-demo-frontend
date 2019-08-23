const webpack = require('webpack')
module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
  ],
  configureWebpack: {    
    plugins: [      
        new webpack.ProvidePlugin({        
            $: 'jquery',        
            jQuery: 'jquery',        
            'windows.jQuery': 'jquery'      
        })    
    ]  
}
};
