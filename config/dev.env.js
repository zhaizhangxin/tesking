'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',//开发环境
	API_HOST: '"http://api-teamsking-dev.windnet.cn"'
//	API_HOST: '"http://localhost:3602"'
	
});
