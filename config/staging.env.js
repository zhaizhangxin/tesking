'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"staging"',//演示环境
	API_HOST: '"http://api-teamsking-staging.windnet.cn"'

});
