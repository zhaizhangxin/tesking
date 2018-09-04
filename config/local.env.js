'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"local"',//本地环境
//API_HOST: '"http://localhost:8888"'
//	API_HOST: '"http://api-teamsking-dev.windnet.cn"'
API_HOST: '"http://192.168.0.101:8080"'
//API_HOST: '"http://192.168.1.134:8080"'
//API_HOST: '"http://192.168.0.118:8080"'
  
})
